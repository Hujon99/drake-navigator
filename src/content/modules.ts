import type { ModuleContent } from "./types";

export const modules: ModuleContent[] = [
  {
    slug: "dataplattform",
    number: "01",
    title: "Dataplattform",
    tagline: "Grunden som faktiskt används.",
    problem:
      "De flesta organisationer sitter på mer data än de kan använda. Plattformar byggs men adopteras inte, kostnaderna skenar och affären får aldrig en enhetlig sanning att luta sig mot.",
    solution: [
      {
        heading: "Modern lakehouse-arkitektur",
        body: "Vi designar och bygger plattformar på Snowflake, Microsoft Fabric, Databricks eller Google Cloud — anpassat efter er stack, era SLA:er och er kostnadsprofil.",
      },
      {
        heading: "Integration som inte spricker",
        body: "ELT/ETL/CDC från ERP, CRM, WMS, SaaS och on-prem-källor. Batch och streaming där det behövs. dbt och Azure Data Factory som motorer.",
      },
      {
        heading: "Governance från dag ett",
        body: "Data catalog, lineage, kvalitet och behörigheter inbyggt — inte ett efterhandsprojekt. Trusted data-lagret är där analys, AI och planering hämtar samma siffror.",
      },
    ],
    outcome: [
      { metric: "70%", label: "kortare time-to-data", body: "Från månader till veckor för nya datakällor i produktion." },
      { metric: "1", label: "version av sanningen", body: "Samma KPI:er i finans, sälj och operations." },
      { metric: "40%", label: "lägre infrakostnad", body: "Genom rätt nivå av compute och elimination av dubblerade pipelines." },
    ],
    nextStep:
      "En 2-veckors plattformsbedömning: vi kartlägger nuläget, identifierar tre quick wins och föreslår målarkitektur med kostnadsestimat.",
    partners: ["Snowflake", "Microsoft Fabric", "Databricks", "Google Cloud", "dbt", "Qlik Talend"],
    caseSlug: "bi-retail",
  },
  {
    slug: "process-intelligence",
    number: "02",
    title: "Process Intelligence",
    tagline: "Era processer, som de faktiskt går.",
    problem:
      "Era processflödesdiagram beskriver hur det borde fungera. Verkligheten ser annorlunda ut — och det är där tiden, pengarna och kundupplevelsen försvinner. Vi gör det osynliga mätbart.",
    solution: [
      {
        heading: "Process mining på riktig data",
        body: "mpmX visualiserar verkliga processflöden baserat på tidstämplar från era system. Avvikelser, slingor och flaskhalsar blir synliga — inte gissade.",
      },
      {
        heading: "AI-agentic process intelligence",
        body: "Nästa steg är inte fler dashboards. Vi bygger agenter som analyserar processavvikelser, föreslår åtgärder och triggar workflows när KPI:er glider.",
      },
      {
        heading: "Från insikt till åtgärd",
        body: "Order-to-Cash, Purchase-to-Pay, Customer Service, IT Service Management. Vi kopplar mining-resultaten direkt till automation och förbättringsbacklogg.",
      },
    ],
    outcome: [
      { metric: "−18%", label: "DSO", body: "Genom att identifiera och åtgärda root-cause i fakturaflödet." },
      { metric: "3x", label: "snabbare rotorsaksanalys", body: "Agenter sammanfattar avvikelser istället för manuell drilldown." },
      { metric: "100%", label: "datadriven", body: "Inga workshops byggda på magkänsla — bara verkliga tidstämplar." },
    ],
    nextStep:
      "Välj en process. Vi extraherar event-log, levererar en första mpmX-analys på 3 veckor och visar var pengarna ligger.",
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
        body: "Inte demos. Riktiga agenter byggda på Azure AI Foundry, Azure OpenAI och Copilot Studio som hanterar kundinteraktion, kategorisering och back-end-integration mot ERP.",
      },
      {
        heading: "Low code där det passar",
        body: "Power Apps, Power Automate och UiPath för flöden som inte kräver custom. Snabbt levererat, lätt att underhålla, governance i ordning.",
      },
      {
        heading: "Custom där det krävs",
        body: "Pro-code applikationer när standard inte räcker — med samma data, samma governance och samma plattform i botten.",
      },
    ],
    outcome: [
      { metric: "6x", label: "ökad konvertering", body: "Partner Inkasso: AI-agent ersatte kundtjänst med full ERP-integration." },
      { metric: "−80%", label: "manuell handpåläggning", body: "I kategoriseringsflöden vi automatiserat med NLP." },
      { metric: "Veckor", label: "till första release", body: "Inte kvartal. Vi paketerar i sprintar med tydlig affärsnytta." },
    ],
    nextStep:
      "En agentic-workshop: vi identifierar tre processer där en AI-agent skulle göra mätbar skillnad och paketerar en pilot på 6–8 veckor.",
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
        body: "Vi bygger semantiska modeller som håller över tid — inte rapport-spaghetti. Återanvändbara, governade, prestanda-tunade.",
      },
      {
        heading: "Embedded analytics & ML i BI",
        body: "Python och R direkt i Qlik Sense. Qlik Predict och DataRobot för AutoML. Statistiska modeller som hjälper er svara på 'varför' — inte bara 'vad'.",
      },
      {
        heading: "Adoption som mål",
        body: "Vi mäter inte success i antal dashboards. Vi mäter i hur många beslut som fattas på dem.",
      },
    ],
    outcome: [
      { metric: "AbbVie", label: "Healthcare ML i Qlik", body: "Avancerade statistiska modeller i R kopplade direkt mot BI-lagret." },
      { metric: "<2s", label: "rapportresponstid", body: "På datamängder över 500M rader genom rätt modellering." },
      { metric: "90%", label: "användning per vecka", body: "Bland målgruppen, mätt 6 månader efter go-live." },
    ],
    nextStep:
      "En BI-hälsokoll: vi går igenom er nuvarande lösning, identifierar tre adoptionsblockerare och föreslår konkreta åtgärder.",
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
        body: "Aimplan, Planacy och Dataplus — vi väljer det som passar er process, inte tvärtom. Budget, prognos, sales planning och driver-baserad modellering.",
      },
      {
        heading: "Writeback till källan",
        body: "Beslut som tas i planeringsverktyget skrivs tillbaka till ERP, CRM eller dataplattform. Ingen export-och-be-någon-uppdatera.",
      },
      {
        heading: "Scenarier som tas på allvar",
        body: "Vad händer om priset går upp 4%? Volymen ner 6%? Vi bygger modellerna så att ledningsgruppen kan svara på det i mötet — inte två veckor efter.",
      },
    ],
    outcome: [
      { metric: "5d → 1d", label: "månadsavslut", body: "Genom att flytta planering ur Excel och in i ett kollaborativt verktyg." },
      { metric: "10+", label: "scenarier parallellt", body: "Utan att tappa kontroll över vilken version som gäller." },
      { metric: "1", label: "sanning", body: "Planering, faktiskt utfall och prognos i samma modell." },
    ],
    nextStep:
      "En planeringskartläggning: vi följer er senaste budgetcykel, identifierar friktionspunkterna och föreslår målbild med verktygsval.",
    partners: ["Aimplan", "Planacy", "Dataplus"],
    caseSlug: "planning-finance",
  },
  {
    slug: "data-strategy",
    number: "06",
    title: "Data Strategy",
    tagline: "Vägen från ambition till värde.",
    problem:
      "Det är inte teknik som stoppar er — det är otydliga prioriteringar, otydligt ägarskap och en backlog som ingen vågar säga nej i. Strategin är där värdet beslutas, inte i verktygsvalet.",
    solution: [
      {
        heading: "Assessment som ger riktning",
        body: "Vi kartlägger mognadsgraden över data, analys, AI och organisation. Inte i en 80-sidig rapport — i en handlingsplan ni kan börja exekvera på i nästa kvartal.",
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
      { metric: "6v", label: "till strategi som exekveras", body: "Inte en hyllvärmare — en roadmap som faktiskt styr investeringarna." },
      { metric: "3–5", label: "prioriterade use cases", body: "Med ROI, beroenden och leveransplan." },
      { metric: "1", label: "språk", body: "Affär, IT och leverans pratar samma data-språk." },
    ],
    nextStep:
      "En 90-minuters intro där vi visar vårt ramverk och föreslår scope för en assessment i er kontext.",
    partners: ["Independent advisory", "QPEP utbildningsprogram"],
    caseSlug: "data-strategy-public",
  },
];

export const moduleBySlug = (slug: string) => modules.find((m) => m.slug === slug);
