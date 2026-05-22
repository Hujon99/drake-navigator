import type { ModuleContent } from "./types";

export const modules: ModuleContent[] = [
  {
    slug: "dataplattform",
    number: "01",
    title: "Dataplattform",
    tagline: "Grunden som faktiskt används.",
    problem:
      "De flesta sitter på mer data än de använder. Plattformar byggs men adopteras inte, kostnaderna skenar och affären får aldrig en enhetlig sanning att luta sig mot.",
    solution: [
      {
        heading: "Modern lakehouse",
        body: "Vi designar och bygger på Snowflake, Microsoft Fabric, Databricks eller Google Cloud — anpassat efter er stack, era SLA:er och er kostnadsprofil.",
      },
      {
        heading: "Integration som håller",
        body: "ELT, ETL och CDC från ERP, CRM, WMS, SaaS och on-prem. Batch och streaming där det behövs. dbt och Azure Data Factory som motorer.",
      },
      {
        heading: "Governance från dag ett",
        body: "Catalog, lineage, kvalitet och behörigheter inbyggt — inte ett efterhandsprojekt. Trusted data är där analys, AI och planering hämtar samma siffror.",
      },
    ],
    outcome: [
      { metric: "70%", label: "kortare time-to-data", body: "Från månader till veckor för nya datakällor i produktion." },
      { metric: "1", label: "version av sanningen", body: "Samma KPI:er i finans, sälj och operations." },
      { metric: "40%", label: "lägre infrakostnad", body: "Genom rätt nivå av compute och avveckling av dubblerade pipelines." },
    ],
    nextStep:
      "Plattformsbedömning på 2 veckor: vi kartlägger nuläget, identifierar tre quick wins och föreslår målarkitektur med kostnadsestimat.",
    partners: ["Snowflake", "Microsoft Fabric", "Databricks", "Google Cloud", "dbt", "Qlik Talend"],
    caseSlug: "bi-retail",
  },
  {
    slug: "process-intelligence",
    number: "02",
    title: "Process Intelligence",
    tagline: "Processen, som den faktiskt går — inte som den beskrivs.",
    problem:
      "Era processdiagram beskriver hur det borde fungera. Verkligheten ser annorlunda ut — och det är där tiden, pengarna och kundupplevelsen försvinner. Vi gör det osynliga mätbart.",
    solution: [
      {
        heading: "Process mining på riktig data",
        body: "mpmX visualiserar verkliga flöden från era tidstämplar. Avvikelser, loopar och flaskhalsar blir synliga — inte gissade.",
      },
      {
        heading: "Agentic process intelligence",
        body: "Nästa steg är inte fler dashboards. Vi bygger agenter som analyserar avvikelser, föreslår åtgärder och triggar workflows när KPI:er glider.",
      },
      {
        heading: "Från insikt till åtgärd",
        body: "Order-to-Cash, Purchase-to-Pay, Customer Service, ITSM. Vi kopplar mining-resultaten direkt till automation och förbättringsbacklogg.",
      },
    ],
    outcome: [
      { metric: "−18%", label: "lägre DSO", body: "Genom root-cause-åtgärder i fakturaflödet." },
      { metric: "3×", label: "snabbare rotorsaksanalys", body: "Agenter sammanfattar avvikelser istället för manuell drilldown." },
      { metric: "100%", label: "datadrivet underlag", body: "Inga workshops byggda på magkänsla — bara verkliga tidstämplar." },
    ],
    nextStep:
      "Pilot på 3 veckor: välj en process, vi extraherar event-log och levererar en första mpmX-analys som visar var pengarna ligger.",
    partners: ["mpmX", "Microsoft Power Platform", "Azure AI Foundry"],
    caseSlug: "mpmx-quote-to-cash",
  },
  {
    slug: "applications",
    number: "03",
    title: "Applications, Automation & Agentic AI",
    tagline: "Bygg det som inte finns att köpa.",
    problem:
      "Standardsystem täcker 80%. Det är de sista 20% — där särdraget i er verksamhet ligger — som avgör. Här bygger vi applikationer, automationer och AI-agenter som faktiskt löser problemet.",
    solution: [
      {
        heading: "Agentic AI i produktion",
        body: "Inte demos. Riktiga agenter på Azure AI Foundry, Azure OpenAI och Copilot Studio som hanterar kundinteraktion, kategorisering och ERP-integration.",
      },
      {
        heading: "Low code där det passar",
        body: "Power Apps, Power Automate och UiPath för flöden som inte kräver custom. Snabbt levererat, lätt att underhålla, governance i ordning.",
      },
      {
        heading: "Custom där det krävs",
        body: "Pro-code-applikationer när standard inte räcker — med samma data, samma governance och samma plattform i botten.",
      },
    ],
    outcome: [
      { metric: "6×", label: "ökad konvertering", body: "Partner Inkasso: AI-agent ersatte kundtjänst med full ERP-integration." },
      { metric: "−80%", label: "mindre manuell handpåläggning", body: "I kategoriseringsflöden vi automatiserat med NLP." },
      { metric: "Veckor", label: "till första release", body: "Inte kvartal. Vi paketerar i sprintar med tydlig affärsnytta." },
    ],
    nextStep:
      "Agentic-workshop på en dag: vi identifierar tre processer där en AI-agent gör mätbar skillnad och paketerar en pilot på 6–8 veckor.",
    partners: ["Azure AI Foundry", "Azure OpenAI", "Copilot Studio", "Power Platform", "UiPath"],
    caseSlug: "partner-inkasso",
  },
  {
    slug: "bi-analytics",
    number: "04",
    title: "BI & Analytics",
    tagline: "Beslut, inte bara rapporter.",
    problem:
      "Det räcker inte att visa siffrorna. BI ska driva beslut — och därför ska analysen finnas där beslutet fattas, i ett språk affären förstår, med tillräcklig statistisk tyngd för att tåla press.",
    solution: [
      {
        heading: "Power BI och Qlik på riktigt",
        body: "Semantiska modeller som håller över tid — inte rapport-spaghetti. Återanvändbara, governade, prestanda-tunade.",
      },
      {
        heading: "Embedded ML i BI",
        body: "Python och R direkt i Qlik Sense. Qlik Predict och DataRobot för AutoML. Statistiska modeller som svarar på 'varför' — inte bara 'vad'.",
      },
      {
        heading: "Adoption som mål",
        body: "Vi mäter inte success i antal dashboards. Vi mäter i antal beslut som fattas på dem.",
      },
    ],
    outcome: [
      { metric: "90%", label: "veckovis aktiva användare", body: "Bland målgruppen, mätt 6 månader efter go-live." },
      { metric: "<2s", label: "rapportresponstid", body: "På datamängder över 500M rader genom rätt modellering." },
      { metric: "5+", label: "statistiska modeller live", body: "AbbVie: avancerad healthcare-statistik i R direkt i BI-lagret." },
    ],
    nextStep:
      "BI-hälsokoll på 2 veckor: vi går igenom er nuvarande lösning, identifierar tre adoptionsblockerare och föreslår konkreta åtgärder.",
    partners: ["Power BI", "Qlik", "Tableau", "DataRobot", "Qlik Predict"],
    caseSlug: "bi-retail",
  },
  {
    slug: "planning",
    number: "05",
    title: "Planning & Writeback",
    tagline: "Planera, justera, skriv tillbaka.",
    problem:
      "Planering i Excel är inte planering — det är versionshantering. Ni behöver kunna ändra antaganden, simulera utfall och skriva tillbaka till källsystemet utan att förlora spårbarhet.",
    solution: [
      {
        heading: "Modern planeringsplattform",
        body: "Aimplan, Planacy eller Dataplus — vi väljer det som passar er process, inte tvärtom. Budget, prognos, sales planning och driver-baserad modellering.",
      },
      {
        heading: "Writeback till källan",
        body: "Beslut som tas i planeringsverktyget skrivs tillbaka till ERP, CRM eller dataplattform. Ingen export-och-be-någon-uppdatera.",
      },
      {
        heading: "Scenarier som tas på allvar",
        body: "Vad händer om priset går upp 4%? Volymen ner 6%? Ledningsgruppen får svaret i mötet — inte två veckor efter.",
      },
    ],
    outcome: [
      { metric: "5d → 1d", label: "snabbare månadsavslut", body: "Genom att flytta planering ur Excel och in i ett kollaborativt verktyg." },
      { metric: "10+", label: "scenarier parallellt", body: "Utan att tappa kontroll över vilken version som gäller." },
      { metric: "1", label: "modell, en sanning", body: "Planering, faktiskt utfall och prognos i samma modell." },
    ],
    nextStep:
      "Planeringskartläggning på 3 veckor: vi följer er senaste budgetcykel, identifierar friktionspunkterna och föreslår målbild med verktygsval.",
    partners: ["Aimplan", "Planacy", "Dataplus"],
    caseSlug: "planning-finance",
  },
  {
    slug: "data-strategy",
    number: "06",
    title: "Data Strategy",
    tagline: "Vägen från ambition till värde.",
    problem:
      "Det är inte tekniken som stoppar er — det är otydliga prioriteringar, otydligt ägarskap och en backlog som ingen vågar säga nej i. Strategin är där värdet beslutas, inte i verktygsvalet.",
    solution: [
      {
        heading: "Assessment som ger riktning",
        body: "Vi kartlägger mognadsgraden över data, analys, AI och organisation. Inte i en 80-sidig rapport — i en handlingsplan ni kan börja exekvera på nästa kvartal.",
      },
      {
        heading: "Use case-portfölj med ROI",
        body: "Vi identifierar och värderar use cases på affärsnytta, teknisk komplexitet och beroenden. Roadmap kopplad till investeringsplan.",
      },
      {
        heading: "Operating model & governance",
        body: "Hur ska data-organisationen se ut? Central, federerad, hybrid? Vi designar målbilden och hjälper er ta första stegen mot den.",
      },
    ],
    outcome: [
      { metric: "6v", label: "till exekverbar strategi", body: "Inte en hyllvärmare — en roadmap som faktiskt styr investeringarna." },
      { metric: "3–5", label: "prioriterade use cases", body: "Med ROI, beroenden och leveransplan." },
      { metric: "1", label: "gemensamt språk", body: "Affär, IT och leverans pratar samma data-språk." },
    ],
    nextStep:
      "Intro på 90 minuter: vi visar vårt ramverk och föreslår scope för en assessment i er kontext.",
    partners: ["Independent advisory", "QPEP utbildningsprogram"],
    caseSlug: "data-strategy-public",
  },
];

export const moduleBySlug = (slug: string) => modules.find((m) => m.slug === slug);
