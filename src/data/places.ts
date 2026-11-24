// Research map data.
// Built from the CV, the abstracts of all papers in publications.bib, and the co-authors'
// institutional affiliations (OpenAlex, retrieved Nov 2026).
// Coordinates are [longitude, latitude]. kind:
//   "position" – where I worked or held a research stay
//   "site"     – field or experimental site described in the papers
//   "partner"  – co-authors' institutions
// papers: BibTeX keys from src/data/publications.bib.

export type PlaceKind = "position" | "site" | "partner"

export type Place = {
  id: string
  name: string
  country: string
  coords: [number, number]
  kind: PlaceKind
  period?: string
  lines: string[] // roles or institutions
  text: string
  papers: string[]
  short?: string // label on the map, if different from name
  label?: { dx: number; dy: number; anchor: "start" | "middle" | "end" }
}

// Number of papers with at least one author affiliated in each country (ISO 3166-1 alpha-2).
export const countryPapers: Record<string, string[]> = {
  IT: ["Brunetti2026", "Brunetti2025a", "Brunetti2025b", "Turco2025", "Zhou2025", "Zhou2025a", "Li2024", "Li2024a", "Simunek2024", "Zhou2024", "Brunetti2023", "Diongue2023", "Kourakos2023", "Lazarovitch202379", "Zhou2023", "Zhou2023a", "Zhou2022", "Falco2020", "Turco2020619", "Piro2019275", "Turco2019163", "Brunetti2018204", "Brunetti2018269", "Brunetti20171113", "Brunetti2017263", "Turco2017780", "Brunetti2016", "Brunetti20161146", "Carbone2015", "Carbone2015568", "Brunetti2018499", "Turco2018507", "Carbone2014381"],
  AT: ["Brunetti2026", "Li2024", "Li2024a", "Brunetti2023", "Diongue2023", "Kourakos2023", "Schubl20231431", "Zhou2023a", "Brunetti2022", "Brunetti2022a", "Krevh2022", "Schubl2022", "Zhou2022", "Brunetti2021", "Brunetti20212991", "Brunetti2020", "Brunetti2020a", "Falco2020", "Turco2020619", "Brunetti2019", "Brunetti20198967"],
  US: ["Brunetti2025a", "Brunetti2025b", "Zhou2025", "Zhou2025a", "Simunek2024", "Zhou2024", "Brunetti2023", "Kourakos2023", "Lazarovitch202379", "Zhou2023", "Zhou2023a", "Brunetti2022", "Brunetti2022a", "Krevh2022", "Zhou2022", "Brunetti2021", "Brunetti20212991", "Brunetti2020a", "Brunetti2019", "Brunetti20198967", "Turco2019163", "Brunetti2018204", "Brunetti2018269", "Brunetti2018312", "Brunetti20171113", "Brunetti2017263", "Brunetti2016", "Brunetti20161146"],
  CZ: ["Brunetti2025a", "Brunetti2022a", "Brunetti20212991", "Brunetti20198967", "Turco2017780"],
  DE: ["Li2024", "Brunetti2023", "Lazarovitch202379", "Zhou2023a", "Krevh2022", "Brunetti2020a", "Brunetti2019"],
  CN: ["Zhou2025", "Zhou2025a", "Lazarovitch202379", "Krevh2022", "Zhou2022"],
  IL: ["Zhou2025", "Zhou2024", "Lazarovitch202379", "Zhou2023"],
  FR: ["Diongue2023", "Zhou2022"],
  NZ: ["Brunetti2023", "Lazarovitch202379"],
  BE: ["Simunek2024"],
  BR: ["Simunek2024"],
  NL: ["Simunek2024"],
  SN: ["Diongue2023"],
  HR: ["Krevh2022"],
  LT: ["Krevh2022"],
  JP: ["Brunetti20171113"],
}

export const places: Place[] = [
  // ── Positions ─────────────────────────────────────────────────────────────
  {
    id: "rende", name: "Rende (Cosenza)", country: "Italy", coords: [16.23, 39.36], kind: "position",
    period: "2004–2017 · 2023–present",
    lines: ["Associate Professor, University of Calabria (2023–present)", "Ph.D. (2014–2017) and M.Sc. (2004–2010)"],
    text: "The University of Calabria campus has been an open-air laboratory: an extensive green roof, a non-vegetated green roof, a permeable pavement, and the peri-urban Vermicelli catchment with its sedimentation tank, together with laboratory tests on pavements and, more recently, tracer experiments in a strongly heterogeneous artificial aquifer.",
    papers: ["Brunetti2026", "Turco2025", "Falco2020", "Turco2020619", "Brunetti2018204", "Brunetti2018269", "Brunetti2018499", "Turco2018507", "Brunetti2017263", "Brunetti2016", "Brunetti20161146", "Carbone2015", "Carbone2015568"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
  {
    id: "brescia", name: "Brescia", country: "Italy", coords: [10.22, 45.54], kind: "position",
    period: "2017",
    lines: ["Postdoctoral Researcher, University of Brescia (URBAID project)"],
    text: "Assisted and integrated urban regeneration; continued collaboration on green roofs, permeable pavements and urban drainage.",
    papers: ["Brunetti2018204", "Brunetti2018269", "Turco2019163", "Turco2020619", "Falco2020"],
    label: { dx: -9, dy: 4, anchor: "end" },
  },
  {
    id: "vienna", name: "Vienna", country: "Austria", coords: [16.37, 48.21], kind: "position",
    period: "2018–2023",
    lines: ["Assistant Professor, BOKU University (2018–2020)", "Senior Research Scientist, Institute of Soil Physics and Rural Water Management (2020–2023)"],
    text: "Laboratory column experiments on microplastics transport, green roofs for domestic wastewater treatment, nitrogen turnover in a controlled aquifer model, and Bayesian work on model complexity, MCMC samplers, optimization and experimental design.",
    papers: ["Brunetti2023", "Brunetti2022", "Schubl2022", "Li2024", "Li2024a", "Brunetti2021", "Brunetti2020", "Brunetti2020a"],
    label: { dx: 9, dy: 10, anchor: "start" },
  },
  {
    id: "prague", name: "Prague", country: "Czech Republic", coords: [14.37, 50.13], kind: "position",
    period: "2018",
    lines: ["Postdoctoral Researcher, Czech University of Life Sciences", "Partner: University of South Bohemia, České Budějovice"],
    text: "Experiments on the uptake of pharmaceuticals such as carbamazepine by green peas and other vegetables led to the Dynamic Plant Uptake module for HYDRUS. Later work modeled tillage and consolidation on two agricultural hillslopes in Czechia.",
    papers: ["Brunetti20198967", "Brunetti20212991", "Brunetti2022a", "Brunetti2025a", "Turco2017780"],
    label: { dx: 9, dy: -2, anchor: "start" },
  },
  {
    id: "dresden", name: "Dresden", country: "Germany", coords: [13.74, 51.05], kind: "position",
    period: "2016",
    lines: ["Visiting Scholar, Technical University of Dresden", "Ongoing collaboration with T. Wöhling"],
    text: "A research stay during the Ph.D. and a lasting collaboration on Bayesian inverse modeling and irrigation modeling.",
    papers: ["Brunetti2023", "Lazarovitch202379"],
    label: { dx: 0, dy: -10, anchor: "middle" },
  },
  {
    id: "riverside", name: "Riverside, California", country: "USA", coords: [-117.33, 33.97], kind: "position",
    period: "2015–2016",
    lines: ["Visiting Scholar, University of California, Riverside", "Ongoing collaboration with J. Šimůnek (HYDRUS)"],
    text: "Where the collaboration with the HYDRUS team began. It continues today in model development (DPU, COSMIC, Furrow and GOpt modules) and in the 2024 review of the HYDRUS software packages.",
    papers: ["Simunek2024", "Brunetti2025a", "Brunetti2022", "Brunetti20198967", "Brunetti2018312", "Brunetti20171113", "Brunetti2016", "Brunetti20161146"],
    label: { dx: 9, dy: 10, anchor: "start" },
  },
  {
    id: "davis", name: "Davis, California", country: "USA", coords: [-121.76, 38.54], kind: "position",
    period: "2017–2018",
    lines: ["Postdoctoral Researcher, University of California, Davis", "Partners: California Department of Pesticide Regulation, CalEPA (Sacramento)"],
    text: "Regional aquifer management and the hydrology of managed aquifer recharge, which led to a long-running collaboration on agricultural managed aquifer recharge (Ag-MAR) in the Central Valley.",
    papers: ["Kourakos2023", "Zhou2023", "Zhou2024", "Zhou2025", "Zhou2025a", "Brunetti2019"],
    label: { dx: -9, dy: -4, anchor: "end" },
  },

  // ── Field and experimental sites ─────────────────────────────────────────
  {
    id: "central-valley", name: "Central Valley, California", short: "Central Valley", country: "USA", coords: [-120.2, 36.7], kind: "site",
    lines: ["Agricultural managed aquifer recharge sites"],
    text: "Flooding farmland to recharge groundwater: ponding, soil moisture and bromide tracer data in three vadose zone profiles, and pesticide leaching and recharge transit times through 70-m-thick unsaturated zones characterized with towed transient electromagnetic surveys.",
    papers: ["Zhou2023", "Zhou2024", "Zhou2025", "Zhou2025a", "Kourakos2023"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
  {
    id: "austria-network", name: "Austrian soil water monitoring network", short: "Austrian network", country: "Austria", coords: [14.6, 47.45], kind: "site",
    lines: ["14 monitoring stations and lysimeters"],
    text: "Long-term soil water content records used to estimate potential groundwater recharge with Bayesian calibration of HYDRUS-1D. Recharge rates decrease from west to east across Austria.",
    papers: ["Schubl20231431", "Schubl2022"],
    label: { dx: -9, dy: 12, anchor: "end" },
  },
  {
    id: "rollesbroich", name: "Rollesbroich catchment", short: "Rollesbroich", country: "Germany", coords: [6.3, 50.62], kind: "site",
    lines: ["Partner: Forschungszentrum Jülich (also co-authors on the Croatian gley soil study)"],
    text: "Cosmic-ray neutron sensing data used to estimate soil hydraulic properties inversely, coupling the COSMIC operator with HYDRUS-1D.",
    papers: ["Brunetti2019", "Krevh2022"],
    label: { dx: -9, dy: 4, anchor: "end" },
  },
  {
    id: "langeoog", name: "Langeoog Island", short: "Langeoog", country: "Germany", coords: [7.5, 53.75], kind: "site",
    lines: ["Partner: Federal Institute for Geosciences and Natural Resources (BGR)"],
    text: "Field stable-isotope data used to test how soil tension affects isotope fractionation and interpretations of where roots take up water.",
    papers: ["Zhou2023a"],
    label: { dx: 9, dy: 0, anchor: "start" },
  },
  {
    id: "croatia", name: "Eastern Croatia", country: "Croatia", coords: [18.7, 45.35], kind: "site",
    lines: ["Partner: University of Zagreb"],
    text: "Seasonal soil moisture dynamics in gley soils driven by groundwater table oscillations.",
    papers: ["Krevh2022"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
  {
    id: "senegal", name: "Senegal", country: "Senegal", coords: [-16.4, 14.5], kind: "site",
    lines: ["Sahelian agroforestry parkland", "Partners: Cheikh Anta Diop University, ISRA, IRD, Université Gaston Berger, CIRAD and INRAE (France)"],
    text: "Multiannual soil moisture and sap flow measurements under Faidherbia albida trees, interpreted with a multifidelity HYDRUS surrogate and Bayesian inference. The trees could have a net positive effect on the water balance.",
    papers: ["Diongue2023"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },

  // ── Partner institutions ────────────────────────────────────────────────
  {
    id: "naples", name: "Naples", country: "Italy", coords: [14.25, 40.85], kind: "partner",
    lines: ["University of Naples Federico II"],
    text: "Heterogeneous transport experiments, isotope transport modeling, and Ag-MAR studies in California.",
    papers: ["Brunetti2026", "Zhou2025", "Zhou2025a", "Zhou2023a", "Zhou2022"],
    label: { dx: -9, dy: 4, anchor: "end" },
  },
  {
    id: "bavaria", name: "Munich & Augsburg", country: "Germany", coords: [11.2, 48.25], kind: "partner",
    lines: ["Technical University of Munich", "Bavarian State Office for the Environment"],
    text: "Nitrogen turnover in a controlled aquifer model, and microplastics transport in natural sediments.",
    papers: ["Brunetti2020a", "Li2024"],
    label: { dx: 0, dy: -10, anchor: "middle" },
  },
  {
    id: "muncheberg", name: "Müncheberg", country: "Germany", coords: [14.13, 52.52], kind: "partner",
    lines: ["Leibniz Centre for Agricultural Landscape Research (ZALF)"],
    text: "Soil moisture and groundwater table interactions in gley soils of eastern Croatia.",
    papers: ["Krevh2022"],
    label: { dx: 9, dy: 0, anchor: "start" },
  },
  {
    id: "benelux", name: "Mol & Utrecht", country: "Belgium · Netherlands", coords: [5.1, 51.65], kind: "partner",
    lines: ["Belgian Nuclear Research Centre (SCK CEN)", "Utrecht University"],
    text: "Co-authors of the review of HYDRUS developments and applications since 2016.",
    papers: ["Simunek2024"],
    label: { dx: -9, dy: 0, anchor: "end" },
  },
  {
    id: "france", name: "Montpellier & Lyon", country: "France", coords: [4.3, 44.6], kind: "partner",
    lines: ["CIRAD, INRAE, IRD and Institut Agro (Montpellier)", "INRAE RiverLy (Lyon)"],
    text: "Agroforestry hydrology in Senegal, and how evaporation fractionation affects isotope transport modeling.",
    papers: ["Diongue2023", "Zhou2022"],
    label: { dx: -9, dy: 4, anchor: "end" },
  },
  {
    id: "zagreb", name: "Zagreb", country: "Croatia", coords: [15.98, 45.81], kind: "partner",
    lines: ["University of Zagreb (also Invited Lecturer, 2018)"],
    text: "Soil water dynamics in gley soils.",
    papers: ["Krevh2022"],
    label: { dx: -2, dy: 14, anchor: "middle" },
  },
  {
    id: "vilnius", name: "Vilnius", country: "Lithuania", coords: [25.28, 54.69], kind: "partner",
    lines: ["Mykolas Romeris University"],
    text: "Soil water dynamics in gley soils.",
    papers: ["Krevh2022"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
  {
    id: "israel", name: "Be'er Sheva & Haifa", country: "Israel", coords: [34.9, 31.9], kind: "partner",
    lines: ["Ben-Gurion University of the Negev", "Technion – Israel Institute of Technology"],
    text: "Agricultural managed aquifer recharge in California, and the review of modeling irrigation with HYDRUS.",
    papers: ["Zhou2023", "Zhou2024", "Zhou2025", "Lazarovitch202379"],
    label: { dx: -9, dy: -6, anchor: "end" },
  },
  {
    id: "beijing", name: "Beijing", country: "China", coords: [116.4, 39.9], kind: "partner",
    lines: ["Tsinghua University", "China Geological Survey"],
    text: "Recharge transit times and pesticide transport in deep vadose zones, and isotope transport modeling.",
    papers: ["Zhou2025", "Zhou2025a", "Zhou2022"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
  {
    id: "china-other", name: "Yangling, Hohhot & Nanjing", country: "China", coords: [110.5, 35.5], kind: "partner",
    lines: ["Northwest A&F University", "Inner Mongolia Agricultural University", "Hohai University"],
    text: "Soil moisture dynamics in gley soils, and modeling of irrigation with HYDRUS.",
    papers: ["Krevh2022", "Lazarovitch202379"],
    label: { dx: 0, dy: 19, anchor: "middle" },
  },
  {
    id: "tokyo", name: "Tokyo area", country: "Japan", coords: [139.55, 35.75], kind: "partner",
    lines: ["Tokyo University of Agriculture and Technology", "Saitama University"],
    text: "A computationally efficient pseudo-3D model for borehole heat exchangers.",
    papers: ["Brunetti20171113"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
  {
    id: "lincoln", name: "Lincoln", country: "New Zealand", coords: [172.47, -43.64], kind: "partner",
    lines: ["Lincoln Agritech"],
    text: "Markov-chain Monte Carlo samplers for inverse vadose zone modeling, and modeling of irrigation with HYDRUS.",
    papers: ["Brunetti2023", "Lazarovitch202379"],
    label: { dx: -9, dy: 4, anchor: "end" },
  },
  {
    id: "rio", name: "Rio de Janeiro", country: "Brazil", coords: [-43.2, -22.9], kind: "partner",
    lines: ["Federal University of Rio de Janeiro"],
    text: "Co-author of the review of HYDRUS developments since 2016.",
    papers: ["Simunek2024"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
  {
    id: "oregon", name: "Corvallis, Oregon", country: "USA", coords: [-123.28, 44.56], kind: "partner",
    lines: ["Oregon State University"],
    text: "Soil–fruit modeling, siting of managed aquifer recharge, and irrigation modeling.",
    papers: ["Brunetti2025b", "Kourakos2023", "Lazarovitch202379"],
    label: { dx: 9, dy: 0, anchor: "start" },
  },
  {
    id: "nmsu", name: "Las Cruces, New Mexico", country: "USA", coords: [-106.75, 32.28], kind: "partner",
    lines: ["New Mexico State University"],
    text: "Coupling HYDRUS with the SUGAR model to simulate water and carbohydrate allocation in tomato crops under different irrigation regimes.",
    papers: ["Brunetti2025b"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
  {
    id: "maricopa", name: "Maricopa, Arizona", country: "USA", coords: [-112.0, 33.06], kind: "partner",
    lines: ["USDA-ARS Arid Land Agricultural Research Center"],
    text: "A coupled surface–subsurface model of furrow irrigation and fertigation, validated against a field fertigation experiment.",
    papers: ["Brunetti2018312"],
    label: { dx: -9, dy: 12, anchor: "end" },
  },
  {
    id: "georgia", name: "Athens, Georgia", country: "USA", coords: [-83.38, 33.95], kind: "partner",
    lines: ["University of Georgia"],
    text: "Modeling of irrigation and related processes with HYDRUS.",
    papers: ["Lazarovitch202379"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
  {
    id: "dc", name: "Washington, D.C.", country: "USA", coords: [-77.04, 38.9], kind: "partner",
    lines: ["USDA Economic Research Service"],
    text: "Cost-effective siting of managed aquifer recharge in California's Central Valley.",
    papers: ["Kourakos2023"],
    label: { dx: 9, dy: 4, anchor: "start" },
  },
]
