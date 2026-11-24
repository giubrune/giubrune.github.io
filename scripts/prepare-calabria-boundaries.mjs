// One-off: trims the Openpolis municipalities TopoJSON for Calabria (region 18)
// to the properties used by the website.
// Source: https://github.com/openpolis/geojson-italy (CC BY 4.0, based on ISTAT boundaries)
// Usage: node scripts/prepare-calabria-boundaries.mjs limits_R_18_municipalities.topo.json
import { readFileSync, writeFileSync } from "node:fs"

const topo = JSON.parse(readFileSync(process.argv[2], "utf8"))
for (const g of topo.objects.comuni.geometries) {
  const p = g.properties
  g.properties = { name: p.name, prov: p.prov_acr, istat: p.com_istat_code }
}
writeFileSync("src/data/calabria-comuni.topo.json", JSON.stringify(topo))
console.log(`${topo.objects.comuni.geometries.length} municipalities written`)
