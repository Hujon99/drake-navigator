import type { CaseContent } from "./types";

export const cases: CaseContent[] = [
  {
    slug: "partner-inkasso",
    client: "Partner Inkasso AB",
    title: "AI-agent och automation för finansärenden",
    modules: ["applications"],
    challenge:
      "Hög volym inkommande ärenden till kundtjänst, lågt självservicebeteende på hemsidan och manuell hantering av betalplaner mot ERP.",
    approach: [
      "Konversations-AI-agent byggd på Azure AI Foundry och Azure OpenAI Service",
      "Full back-end-integration — agenten skriver betalplaner direkt till ERP",
      "Iterativ release med mätbar konvertering som styrande KPI",
    ],
    results: [
      { metric: "6×", label: "ökad konvertering på hemsidan" },
      { metric: "−70%", label: "lägre kundtjänstvolym för standardärenden" },
      { metric: "Featured", label: "lyft fram av Microsoft som referenscase" },
    ],
    tech: ["Azure AI Foundry", "Azure OpenAI", "Custom ERP-integration"],
  },
  {
    slug: "siemens-energy",
    client: "Siemens Energy",
    title: "NLP-driven artikelkategorisering i SAP",
    modules: ["applications", "data-strategy"],
    challenge:
      "Bristfällig och inkonsekvent grunddata i SAP gjorde analys, inköp och prognos opålitlig. Manuell kategorisering var inte skalbar.",
    approach: [
      "NLP-modell tränad på existerande artikeldata och fri text",
      "Feature engineering: lexical diversity, ordfrekvenser, kategorimatchning",
      "Automatisk matchning mot fördefinierad kategoristruktur",
    ],
    results: [
      { metric: "−80%", label: "mindre manuell handpåläggning" },
      { metric: "SAP", label: "renare grunddata över hela ERP-stacken" },
      { metric: "Skalbart", label: "modellen utökas till nya artikelsegment" },
    ],
    tech: ["Python", "NLP", "SAP-integration"],
  },
  {
    slug: "abbvie",
    client: "AbbVie Inc.",
    title: "Machine Learning för healthcare direkt i Qlik Sense",
    modules: ["bi-analytics"],
    challenge:
      "Behov av avancerade statistiska modeller direkt i BI-lagret — inte i separata data science-verktyg som ingen i verksamheten öppnar.",
    approach: [
      "Python och R kopplat direkt mot Qlik Sense",
      "t-test, paired t-test, chi-square, ANOVA och linjär regression embedded i dashboards",
      "Kohortanalys av patientgrupper och pre/post-behandlingsutfall",
    ],
    results: [
      { metric: "5+", label: "statistiska modeller live i BI" },
      { metric: "0", label: "kontextväxlingar för analytikern" },
      { metric: "R&D", label: "beslutsstöd där besluten faktiskt fattas" },
    ],
    tech: ["Qlik Sense", "R", "Python", "Embedded analytics"],
  },
  {
    slug: "mpmx-quote-to-cash",
    client: "Konfidentiell — Industri",
    title: "Process intelligence på Quote-to-Cash",
    modules: ["process-intelligence"],
    challenge:
      "Orderflödet hade outförklarliga ledtider, hög andel manuella justeringar och DSO i fel riktning. Workshops gav teorier men inga svar.",
    approach: [
      "Event-log extraherad från ERP och CRM",
      "mpmX-analys av faktiskt processflöde — inte tänkt flöde",
      "Identifierade fyra konkreta root causes till re-work och kreditstopp",
    ],
    results: [
      { metric: "−18%", label: "lägre DSO inom 6 månader" },
      { metric: "−42%", label: "färre manuella orderjusteringar" },
      { metric: "4", label: "konkreta automationscase identifierade" },
    ],
    tech: ["mpmX", "Process mining", "ERP-extraktion"],
  },
  {
    slug: "bi-retail",
    client: "Konfidentiell — Retail",
    title: "Modern dataplattform och BI-modernisering",
    modules: ["dataplattform", "bi-analytics"],
    challenge:
      "Legacy DW med långa ledtider för nya KPI:er, motstridig data mellan finans och kommersiellt, eskalerande infrakostnader.",
    approach: [
      "Migration till Snowflake med dbt som transformationslager",
      "Semantisk modell i Power BI ovanpå trusted data",
      "Avveckling av tre parallella rapporteringslösningar",
    ],
    results: [
      { metric: "−40%", label: "lägre infrakostnad" },
      { metric: "70%", label: "kortare time-to-data" },
      { metric: "1", label: "version av sanningen" },
    ],
    tech: ["Snowflake", "dbt", "Power BI", "Azure Data Factory"],
  },
  {
    slug: "planning-finance",
    client: "Konfidentiell — Finance",
    title: "Driver-baserad planering med writeback",
    modules: ["planning"],
    challenge:
      "Budgetprocess i Excel med 40+ ark, versionsförvirring och en månadsavslutsprocess som band finansavdelningen en hel vecka.",
    approach: [
      "Implementation av Aimplan med driver-baserad modell",
      "Writeback till ERP för scenariobeslut",
      "Roll-forward forecast i samma modell som budget och utfall",
    ],
    results: [
      { metric: "5d → 1d", label: "snabbare månadsavslut" },
      { metric: "10+", label: "scenarier parallellt utan versionskaos" },
      { metric: "0", label: "Excel-bilagor kvar i beslutsmöten" },
    ],
    tech: ["Aimplan", "ERP-writeback", "Power BI"],
  },
  {
    slug: "data-strategy-public",
    client: "Konfidentiell — Offentlig sektor",
    title: "Datastrategi och operating model",
    modules: ["data-strategy"],
    challenge:
      "Decentraliserad data, otydligt ägarskap mellan IT och verksamhet, och en backlog av 60+ önskade analyser utan prioritering.",
    approach: [
      "Mognadsbedömning över data, analys, AI och organisation",
      "Use case-portfölj värderad på ROI och komplexitet",
      "Federerad operating model med tydligt centralt platform team",
    ],
    results: [
      { metric: "6v", label: "till exekverbar strategi" },
      { metric: "5", label: "prioriterade use cases i roadmap" },
      { metric: "1", label: "operating model alla skrev under på" },
    ],
    tech: ["Strategi", "Governance", "Operating model design"],
  },
  {
    slug: "setlr-multi",
    client: "Setlr",
    title: "Agentic AI, process intelligence och plattform i ett",
    modules: ["applications", "process-intelligence", "dataplattform", "bi-analytics"],
    challenge:
      "Snabbväxande fintech med behov av att skala operativa processer utan att skala teamet linjärt — och med kundupplevelse som differentiator.",
    approach: [
      "Modern dataplattform på Snowflake som backbone",
      "Process mining (mpmX) på kärnprocesserna för att hitta automationskandidater",
      "AI-agenter för kundinteraktion och back-office",
      "BI-lager för operativ styrning i realtid",
    ],
    results: [
      { metric: "End-to-end", label: "från strategi till produktion" },
      { metric: "Skalbart", label: "tillväxt utan linjär headcount-ökning" },
      { metric: "Datadrivet", label: "varje operativt beslut" },
    ],
    tech: ["Snowflake", "mpmX", "Azure AI Foundry", "Power BI"],
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
