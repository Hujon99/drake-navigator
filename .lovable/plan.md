# Premium designpass — Drake Analytics presentation

Höja hela presentationen från "fungerande mockup" till "färdigt premium säljstöd". Slide för slide-genomgång, närmare Drakes formspråk (typografi, layered tealfält, generösa rytm, finess), bättre tillgänglighet, och riktiga loggor på slide 2 och slide 4.

## Logohämtning (autonomt)

Hämtar från officiella källor via Firecrawl/web (sedan optimerar lokalt, sparas till `src/assets/drake/logos/`):

**Kundloggor (slide 2 — "Kunder vi arbetar med")**
Atlas Copco, Siemens Energy, Alfa Laval, Scania, Swedbank, PostNord, Migrationsverket, Skatteverket.

**Partner/tech-loggor (slide 4 — färgade originalmärken)**
- Data Platforms: Snowflake, Microsoft Fabric, Databricks, Google Cloud, Azure
- BI: Power BI, Qlik, Tableau
- AI: Azure OpenAI, Copilot, Vertex AI, Cortex, DataRobot
- Process Intelligence: mpmX
- Planning: Aimplan, Planacy, Dataplus
- Automation: Power Platform, UiPath
- Integration: dbt, Talend, Alteryx, Azure Data Factory

Säg till om någon logga inte går att hämta lagligt så pingar jag dig att ladda upp originalpaketet (du nämnde att du har det).

## Slide-för-slide-uppgraderingar

**Slide 1 — From Insight to Action** (cover)
- Skikta bakgrunden: djup teal-radial + en svag konturlinjekarta/dataflöde-grafik som rör sig långsamt + Drakes molnformer i lägre opacitet.
- Stor split-typografi: "FROM / INSIGHT / TO ACTION" med Share Bold, hairline-rule i drake-sky mellan rader.
- Animated counter eyebrow ("Sedan 2014 · 50 specialister · 100% oberoende") som tickar in.
- Subtilt grain + vignette för premiumkänsla. Scroll/Next-affordance längst ner ("Tryck → för att börja").

**Slide 2 — Vilka vi är**
- Vänster: större hierarki, stat-grid blir hero (4 stora siffror med tunn underline). Roller blir en horisontell tickrad istället för chips.
- Höger: byt nordenkartan till en mer redaktionell komposition — karta i bakgrund med pulserande punkter på Stockholm/Göteborg/Linköping/Jönköping.
- **Ny rad längst ner: "Kunder vi arbetar med"** — gråskala-loggor i en lugn rad (Atlas Copco, Siemens Energy, Alfa Laval, Scania, Swedbank, PostNord, Migrationsverket, Skatteverket), hover lyfter till färg.

**Slide 3 — Hela kedjan**
- Byt 4-kort-rad mot en riktig flow-visualisering: connectorprickar, animerade linjer mellan stegen, ikon per steg (Database, Layers, ShieldCheck, Sparkles från lucide).
- Ovanför flowet: 3 "lager"-pills (Automation / Agentic AI / Process Intelligence) som ligger som ett band över hela kedjan — illustrerar att de spänner tvärs.
- Använd drake-deep band-bakgrund på flow-sektionen för kontrast.

**Slide 4 — Partnerskap**
- Ersätt textchips med färgade originalloggor i ett rutnät, grupperat per kategori med tunna avdelare.
- Hover: lyft + tunn drake-sky-ram. Loggorna får ha färg (matchar PPT).
- Header får ett kort manifest: "Oberoende · 5 partnerprogram · 20+ plattformar".

**Slide 5 — Kundens fokus**
- Behåll mörk closing-grå men lägg på drake-deep gradient + data-human bilden större och positionerad som hero-element höger.
- Modulchips blir större, numrerade kort (01–06) i 3×2 grid med hover-glow, så det blir den faktiska språngbrädan till hub.
- Lägg in en subtil "→ ESC eller klicka för att öppna områdeskartan" hint.

**Hub (/hub)**
- Lyft korten: större siffror, gradient-stroke på hover, micro-icon per modul, partner-chips byts mot små färgade loggor.
- Multi-case CTA: byt platt drake-deep mot animerad gradient + en metric-strip (3 KPI:er) inline.

**Modulsidor (/modul/$slug)**
- Hero: lägg in modulnummer som gigantisk outline-siffra bakom titeln (typ "06" i 40vw outline).
- Solution-kort: numrerad badge, ikon, tydligare hover.
- Outcomes: stora metric-siffror får gradient text-fill (sky → deep).
- "Plattformar & partners" sektion använder de nya färgade loggorna.

**Casesidor (/case/$slug)**
- Cleanup av spacing, metric-strip blir den visuella förankringen, lägg in eyebrow + kundlogga (gråskala) i hero.

**Navigation & detaljer (globalt)**
- NavBar: subtilare backdrop, drake-sky underline-indikator på hover.
- Knappar/CTAs: konsekvent rounded-pill med svag inner-shadow.
- Lägg till `prefers-reduced-motion` guards på alla blob-/parallax-animationer.

## Tillgänglighet

- Säkerställ WCAG AA: brödtext på vit ≥ `--da-mid-gray-2` (#646363, 4.5:1 ✓), aldrig drake-sky på vit för text (kontrast bara 2.4:1 — endast för accenter/ikoner/stora rubriker ≥ 24px bold som AA Large).
- White text på drake-closing (#5E5E5E) klarar inte AA — byt closing-bakgrund till mörkare drake-deep (#0E5F66) eller lägg overlay.
- Alla nya loggor får alt-text + `aria-label` på länkar.
- Fokus-ring (drake-sky 2px outline) på alla interaktiva element.
- Reduced-motion respekteras på parallax/blobs.

## Teknik

- Loggor: hämta SVG där möjligt (skarpa, små filer), annars PNG@2x. Lagras i `src/assets/drake/logos/{customers,partners}/`.
- Ny komponent `LogoStrip.tsx` (gråskala→färg på hover) för kundraden.
- Ny komponent `PartnerGrid.tsx` (grupperat med kategoriavdelare).
- Ny komponent `ValueChainFlow.tsx` med SVG-paths + Framer Motion stroke-dash animation.
- Lägg till `usePrefersReducedMotion` hook och guarda blob/parallax.
- Inga ändringar av routes/content-struktur — bara presentation/komponenter + assets.
- Inga backend-/datatillägg.

## Leveransordning

1. Hämta + optimera alla loggor.
2. Globala tokens + a11y-fixar (closing-färg, fokus-ringar, reduced-motion).
3. Slide 1 → 5 i ordning.
4. Hub + modul + case-polishing.
5. QA-pass (kolla varje route i preview, kontrast med devtools).
