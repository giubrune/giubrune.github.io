// Loads the soil-moisture snapshot written by scripts/fetch-soil-moisture.mjs (at build time).
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

export type SoilMoistureData = {
  generated: string
  source: string
  variable: string
  dates: string[]
  towns: Record<string, { s: (number | null)[]; p: (number | null)[]; e: number }>
}

export function loadSoilMoisture(): SoilMoistureData | null {
  const file = join(process.cwd(), "src/data/generated/soil-moisture.json")
  if (!existsSync(file)) return null
  try {
    return JSON.parse(readFileSync(file, "utf8"))
  } catch {
    return null
  }
}

// Class breaks in m³/m³ (values are stored in thousandths)
export const SM_BREAKS = [100, 150, 200, 250, 300, 350]
export const SM_LABELS = ["< 0.10", "0.10–0.15", "0.15–0.20", "0.20–0.25", "0.25–0.30", "0.30–0.35", "≥ 0.35"]
export const smBin = (v: number | null | undefined) => (v == null ? -1 : SM_BREAKS.filter((b) => v >= b).length)

export function median(values: (number | null)[]) {
  const a = values.filter((v): v is number => v != null).sort((x, y) => x - y)
  if (!a.length) return null
  const m = Math.floor(a.length / 2)
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2
}
