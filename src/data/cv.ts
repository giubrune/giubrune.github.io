// Structured CV data used across Research, Teaching, Experience and CV pages.
// Source: CV_Giuseppe_Brunetti.pdf (last updated November 11, 2026).

export const researchFields = [
  {
    title: "Soil physics and vadose zone hydrology",
    text: "Water flow, heat and solute transport in variably saturated soils, from laboratory columns and lysimeters to field plots, hillslopes, and deep vadose zones beneath managed aquifer recharge sites.",
    topic: "vadose",
  },
  {
    title: "Numerical modeling of transport processes",
    text: "Physically based models of flow and reactive transport in unsaturated porous media, including coupled soil–plant models of water, chemical, and carbohydrate translocation, and new modules for the HYDRUS software packages.",
    topic: "modeling",
  },
  {
    title: "Bayesian inference and uncertainty",
    text: "Bayesian calibration, model selection and complexity analysis, global optimization, and information content of monitoring data for vadose zone models.",
    topic: "inverse",
  },
]

export const education = [
  { year: "2024", title: "National Scientific Habilitation, Full Professor", detail: "Hydrology and Hydraulic Constructions, Italy" },
  { year: "2020", title: "National Scientific Habilitation, Associate Professor", detail: "Hydrology and Hydraulic Constructions, Italy" },
  { year: "2014–2017", title: "Ph.D., University of Calabria", detail: "Dissertation: On the use of mechanistic modeling for the numerical analysis of Low Impact Development techniques." },
  { year: "2004–2010", title: "M.Sc. in Building Engineering–Architecture (cum laude)", detail: "University of Calabria, Italy" },
]

export const teaching = [
  {
    institution: "University of Calabria, Italy",
    courses: [
      { years: "2025–present", title: "Integrated Hydrological Modeling" },
      { years: "2023–present", title: "Hydraulic Constructions" },
      { years: "2023–2024", title: "Hydrology" },
      { years: "2016–2017", title: "Hydraulic Constructions (Teaching Assistant)" },
    ],
  },
  {
    institution: "BOKU University, Vienna, Austria",
    courses: [
      { years: "2022–present", title: "Soil Physical Modeling with Python" },
      { years: "2022–present", title: "Simulation in the Vadose Zone Environment" },
      { years: "2019–present", title: "Development and Application of Water Erosion Models" },
      { years: "2019–present", title: "Soil Erosion Models and Their Application" },
      { years: "2019–2021", title: "Computing Seminars on Hydraulics and Rural Water Management" },
    ],
  },
  {
    institution: "University of Zagreb, Croatia",
    courses: [{ years: "2018", title: "Use and Conservation of Water Resources (Invited Lecturer)" }],
  },
]

export const awards = [
  { year: "2025", title: "Outstanding Paper Award", detail: "“Developments and Applications of the HYDRUS Computer Software Packages Since 2016”, Vadose Zone Journal. CANVAS 2025, Salt Lake City, USA." },
  { year: "2022", title: "“Rita Levi Montalcini” Young Researchers Program", detail: "Ministry of University and Research, Italy. Competitively selects 30 young researchers employed at foreign research institutions." },
  { year: "2018", title: "International Soil Modeling Consortium Early Career Award", detail: "2nd ISMC Conference, Wageningen, Netherlands. Recognizes outstanding achievements in soil physics and groundwater hydrology." },
  { year: "2017", title: "Marie Skłodowska-Curie Seal of Excellence", detail: "Project: Wetland Roofs for a Sustainable Environment." },
  { year: "2017", title: "Outstanding Reviewer", detail: "Journal of Hydrology." },
]

export const projects = [
  { years: "2022–present", role: "Principal Investigator", title: "Development of a data-informed Bayesian probabilistic platform for dynamic calibration of vadose zone hydrological models", funder: "Rita Levi Montalcini Program" },
  { years: "2021–present", role: "Principal Investigator", title: "Preferential flow and nonequilibrium transport in agricultural hillslope: bridging the gap between observations and model identification (PREMOD)", funder: "WTZ" },
  { years: "2022–present", role: "Co-PI & Work Package Leader", title: "Soil erosion in Austria – from mean to extreme (EROS-A)", funder: "ACRP" },
  { years: "2021–present", role: "Co-PI & Work Package Leader", title: "Heat below the city", funder: "City of Vienna, WWTF" },
  { years: "2020–present", role: "Co-PI & Supervisor", title: "Macro and microplastics in agricultural soil systems", funder: "Marie Skłodowska-Curie ITN" },
  { years: "2020–present", role: "Co-PI & Work Package Leader", title: "Development of physical–biological biochar filters for groundwater remediation with a focus on biofilm development", funder: "Forschung Altlastensanierung" },
  { years: "2019–present", role: "Co-PI & Work Package Leader", title: "Variability of groundwater recharge rates in Austria", funder: "Austrian Academy of Sciences" },
]

export const editorial = {
  associateEditor: ["Journal of Hydrology", "Vadose Zone Journal", "Soil Science Society of America Journal", "Frontiers in Water – Water and Hydrocomplexity", "Journal of Hydrology and Hydromechanics"],
  reviewer: ["Nature Communications", "Journal of Hydrology", "Environmental Modelling & Software", "Applied Energy", "Catena", "European Journal of Soil Science", "Transportation Geotechnics", "Environmental Earth Sciences", "Building Simulation", "Agricultural Water Management", "Science of the Total Environment", "Vadose Zone Journal", "Urban Water Journal", "Hydrology Research", "International Journal of Pavement Engineering", "Journal of Irrigation and Drainage", "PLOS ONE", "Soil and Water Research", "Applied Water Science", "Transport in Porous Media", "Coatings", "Geoderma", "Hydrology and Earth System Sciences", "Environmental Pollution"],
  projectEvaluator: ["Italian Ministry of University and Research (REPRISE)", "Wissenschaftlich-Technische Zusammenarbeit (WTZ, Austria)", "Czech Science Foundation"],
}

export const sessions = [
  { year: "2027", text: "Convener, “Hydrological processes and contaminants transport in the vadose zone: Recent developments and novel insights”, EGU 2027, Vienna." },
  { year: "2026", text: "Convener, “Hydrological processes and contaminants transport in the vadose zone: Recent developments and novel insights”, EGU 2026, Vienna." },
  { year: "2025", text: "Convener, “Hydrological processes and contaminants transport in the vadose zone: Recent developments and novel insights”, EGU 2025, Vienna." },
  { year: "2024", text: "Co-convener, “Hydrobiogeochemical processes in heterogeneous multiphase systems across scales”, EGU 2024, Vienna." },
  { year: "2023", text: "Co-convener, “Flow and transport in the vadose zone – Experimental and modeling approaches for characterizing processes in a heterogenous soil-plant system”, EGU 2023, Vienna." },
  { year: "2023", text: "Chair, 7th International Conference “HYDRUS Software Applications to Subsurface Flow and Contaminant Transport Problems”, Prague." },
  { year: "2022", text: "Co-convener, “Modeling water flow and contaminant transport in soils”, XXIV Computational Methods in Water Resources (CMWR), Gdańsk University of Technology." },
]

export const talks = [
  { year: "2025", kind: "Invited", title: "Bayesian Inference in Physically-based Vadose Zone Modeling: The Good, The Bad and The Ugly", venue: "EGU 2025, Vienna" },
  { year: "2023", kind: "Keynote", title: "Re-greening HYDRUS: Towards a unified physically-based soil-plant model", venue: "7th International Conference “HYDRUS Software Applications to Subsurface Flow and Contaminant Transport Problems”, Prague" },
  { year: "2017", kind: "Keynote", title: "Selected Applications of HYDRUS Models for Engineering Problems", venue: "5th International Conference “HYDRUS Software Applications to Subsurface Flow and Contaminant Transport Problems”, Prague" },
]
