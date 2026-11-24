// Fetches modelled soil moisture for every municipality in Calabria from Open-Meteo
// and writes src/data/generated/soil-moisture.json for the website build.
//
// - Variable: depth-weighted mean volumetric water content of the top 28 cm,
//   (7·θ[0–7 cm] + 21·θ[7–28 cm]) / 28, averaged over each day (hourly values).
// - Period: the last 30 days plus today (today = model analysis/forecast).
// - One point per municipality (geographic centroid); Open-Meteo snaps it to its model grid.
//
// Data: Open-Meteo.com (CC BY 4.0), free API for non-commercial use (< 10,000 calls/day).
// Usage: node scripts/fetch-soil-moisture.mjs   (exits non-zero and writes nothing on failure)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { feature } from "topojson-client"
import { geoCentroid } from "d3-geo"

const OUT = "src/data/generated/soil-moisture.json"
const BATCH = 100
const PAST_DAYS = 30

const topo = JSON.parse(readFileSync("src/data/calabria-comuni.topo.json", "utf8"))
const towns = feature(topo, topo.objects.comuni).features.map((f) => {
  const [lon, lat] = geoCentroid(f)
  return { id: f.properties.istat, lat: +lat.toFixed(4), lon: +lon.toFixed(4) }
})

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchBatch(batch, attempt = 1) {
  const url = new URL("https://api.open-meteo.com/v1/forecast")
  url.searchParams.set("latitude", batch.map((t) => t.lat).join(","))
  url.searchParams.set("longitude", batch.map((t) => t.lon).join(","))
  url.searchParams.set("hourly", "soil_moisture_0_to_7cm,soil_moisture_7_to_28cm")
  url.searchParams.set("daily", "precipitation_sum")
  url.searchParams.set("past_days", String(PAST_DAYS))
  url.searchParams.set("forecast_days", "1")
  url.searchParams.set("timezone", "Europe/Rome")
  try {
    const res = await fetch(url, { headers: { "User-Agent": "giubrune.github.io soil-moisture map" } })
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`)
    const json = await res.json()
    return Array.isArray(json) ? json : [json]
  } catch (err) {
    if (attempt >= 4) throw err
    console.warn(`  retry ${attempt} after error: ${err.message}`)
    await sleep(5000 * attempt)
    return fetchBatch(batch, attempt + 1)
  }
}

function dailyTopSoil(hourly) {
  const t = hourly.time, a = hourly.soil_moisture_0_to_7cm, b = hourly.soil_moisture_7_to_28cm
  const days = new Map()
  for (let i = 0; i < t.length; i++) {
    if (a[i] == null || b[i] == null) continue
    const d = t[i].slice(0, 10)
    const v = (7 * a[i] + 21 * b[i]) / 28
    const acc = days.get(d) ?? { s: 0, n: 0 }
    acc.s += v; acc.n++
    days.set(d, acc)
  }
  return days
}

const results = {}
let dates = null
for (let i = 0; i < towns.length; i += BATCH) {
  const batch = towns.slice(i, i + BATCH)
  console.log(`Fetching ${i + 1}–${i + batch.length} of ${towns.length}`)
  const data = await fetchBatch(batch)
  if (data.length !== batch.length) throw new Error(`Expected ${batch.length} locations, got ${data.length}`)
  data.forEach((d, j) => {
    const daily = dailyTopSoil(d.hourly)
    if (!dates) dates = d.daily.time
    // θ stored as integer thousandths of m³/m³; precipitation in tenths of mm
    let s = dates.map((day) => { const x = daily.get(day); return x && x.n >= 12 ? Math.round((x.s / x.n) * 1000) : null })
    // Grid cells the model treats as water, urban or bare rock report exactly 0: treat them as missing
    if (s.every((v) => v == null || v === 0)) s = s.map(() => null)
    const p = dates.map((_, k) => (d.daily.precipitation_sum?.[k] == null ? null : Math.round(d.daily.precipitation_sum[k] * 10)))
    results[batch[j].id] = { s, p, e: Math.round(d.elevation) }
  })
  await sleep(1500)
}

const ids = Object.keys(results)
const complete = ids.filter((id) => results[id].s.at(-1) != null).length
if (complete < towns.length * 0.8) throw new Error(`Only ${complete}/${towns.length} municipalities have data for today`)

mkdirSync("src/data/generated", { recursive: true })
writeFileSync(OUT, JSON.stringify({
  generated: new Date().toISOString(),
  source: "Open-Meteo.com (best-match weather model), CC BY 4.0",
  variable: "Daily mean volumetric water content of the top 28 cm, (7·θ0–7 + 21·θ7–28)/28, in thousandths of m³/m³",
  dates,
  towns: results,
}))
console.log(`Wrote ${OUT}: ${ids.length} municipalities, ${dates.length} days, ${complete} with data for ${dates.at(-1)}`)
