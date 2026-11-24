// Places on the research map. Coordinates are [longitude, latitude].
// kind: "position" = where I worked; "field" = field study / collaboration region.
// papers: BibTeX keys from src/data/publications.bib.

export type Place = {
  id: string
  name: string
  country: string
  coords: [number, number]
  kind: "position" | "field"
  panel: "europe" | "usa" | "africa"
  period: string
  roles: string[]
  text: string
  papers: string[]
}

export const places: Place[] = [
  {
    id: "rende", name: "Rende (Cosenza)", country: "Italy", coords: [16.23, 39.36], kind: "position", panel: "europe",
    period: "2004–2017 · 2023–present",
    roles: ["Associate Professor, University of Calabria (2023–present)", "Ph.D. (2014–2017) and M.Sc. (2004–2010)"],
    text: "Where it started and where I am now. Doctoral work on green roofs, permeable pavements and other Low Impact Development techniques; today, vadose zone modeling, Bayesian inference and integrated hydrological modeling.",
    papers: ["Brunetti2026", "Turco2025", "Brunetti2017263", "Brunetti20161146", "Brunetti2016"],
  },
  {
    id: "brescia", name: "Brescia", country: "Italy", coords: [10.22, 45.54], kind: "position", panel: "europe",
    period: "2017",
    roles: ["Postdoctoral Researcher, University of Brescia"],
    text: "URBAID project: assisted and integrated urban regeneration.",
    papers: [],
  },
  {
    id: "vienna", name: "Vienna", country: "Austria", coords: [16.37, 48.21], kind: "position", panel: "europe",
    period: "2018–2023",
    roles: ["Assistant Professor, BOKU University (2018–2020)", "Senior Research Scientist and Lecturer, Institute of Soil Physics and Rural Water Management (2020–2023)"],
    text: "Groundwater recharge in Austria, soil erosion, heat below the city, microplastics and biochar filters, and a Bayesian take on model complexity and the information content of soil water data.",
    papers: ["Schubl20231431", "Schubl2022", "Brunetti2023", "Brunetti2022", "Li2024", "Brunetti2020"],
  },
  {
    id: "prague", name: "Prague", country: "Czech Republic", coords: [14.37, 50.13], kind: "position", panel: "europe",
    period: "2018",
    roles: ["Postdoctoral Researcher, Czech University of Life Sciences"],
    text: "Processes in the soil–water–plant environment: the origin of the Dynamic Plant Uptake module for HYDRUS. Prague also hosts the HYDRUS conferences, where I gave keynotes in 2017 and 2023 and chaired the 7th edition.",
    papers: ["Brunetti20198967", "Brunetti20212991", "Brunetti2022a", "Brunetti2025a"],
  },
  {
    id: "dresden", name: "Dresden", country: "Germany", coords: [13.74, 51.05], kind: "position", panel: "europe",
    period: "2016",
    roles: ["Visiting Scholar, Technical University of Dresden"],
    text: "Research visit during the Ph.D.",
    papers: [],
  },
  {
    id: "croatia", name: "Eastern Croatia", country: "Croatia", coords: [18.4, 45.4], kind: "field", panel: "europe",
    period: "Field study",
    roles: ["Collaboration with the University of Zagreb"],
    text: "Seasonal soil moisture dynamics in gley soils driven by groundwater table oscillations.",
    papers: ["Krevh2022"],
  },
  {
    id: "senegal", name: "Senegal", country: "Senegal", coords: [-16.4, 14.5], kind: "field", panel: "africa",
    period: "Field study",
    roles: ["International collaboration"],
    text: "A probabilistic assessment of the hydrological impact of the Faidherbia albida tree in an arid agroforestry system.",
    papers: ["Diongue2023"],
  },
  {
    id: "riverside", name: "Riverside, California", country: "USA", coords: [-117.33, 33.97], kind: "position", panel: "usa",
    period: "2015–2016",
    roles: ["Visiting Scholar, University of California, Riverside"],
    text: "Working with the HYDRUS team on numerical modeling of variably saturated flow, the beginning of a long collaboration on HYDRUS development.",
    papers: ["Brunetti2018312", "Brunetti20171113"],
  },
  {
    id: "davis", name: "Davis, California", country: "USA", coords: [-121.76, 38.54], kind: "position", panel: "usa",
    period: "2017–2018",
    roles: ["Postdoctoral Researcher, University of California, Davis"],
    text: "Managed aquifer recharge in California's Central Valley: deep vadose zones, recharge transit times and the fate of pesticides.",
    papers: ["Zhou2023", "Kourakos2023", "Zhou2024", "Zhou2025"],
  },
]
