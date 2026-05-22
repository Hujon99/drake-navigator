## Mål

Lyfta web-sidorna `/modul/$slug` (ModuleBody) och `/case/$slug` (CaseBody) till en klart vassare nivå — utan att röra PDF-slides eller övriga sidor. Tonalitet i copy hålls, men putsas. Innehåll får skrivas om friare så länge innebörden består.

PDF-versionen (ModuleSlide / CaseSlide) lämnas orörd.

---

## Design-uppgraderingar

### ModuleBody — sektion för sektion

**Hero**
- Lägg in en horisontell "modul-räknare" ovanför titeln: `01 / 06 — DATAPLATTFORM` med tunn linje mellan, så besökaren ser var i serien hen är.
- Splitlayout istället för centrerad: titel + tagline vänster (60%), höger kolumn med "I korthet"-kort (3 punkter destillerade från solution-headings, små eyebrows, ingen brödtext).
- Outline-numret skalas ner något och flyttas till bakgrunden bakom högerkolumnen så det inte krockar med text.
- Lägg till en subtil scroll-indikator (pil + "Scrolla" eyebrow) i nedre vänstra hörnet.

**Problemet → "Utmaningen"**
- Behåll en kraftig pull-quote-känsla men splitta i två kolumner: vänster en stor eyebrow + en 4-ords sammanfattning som "rubrik", höger den långa förklarande texten.
- Tunn vertikal accent-linje i drake-sky mellan kolumnerna.

**Vad vi gör (solution)**
- Korten får numrerad eyebrow + ikon-platshållare (lucide), tightare padding, hover som lyfter kortet 2px och färgar nummret i drake-sky → drake-deep.
- Lägg till en liten "tag-rad" under varje kort som mappar till relevanta partners från `m.partners` (max 2 per kort, klientside-mappning baserad på enkla regler eller index — pragmatiskt).

**Exempel & utfall**
- Bygg om till ett bento-grid: ett stort hero-utfall (det första, med riktig metric) tar dubbel bredd och får gradient-bakgrund (drake-tint-soft → vit), två mindre utfall till höger staplade.
- Metricerna får större font-display (clamp 56–96px), label uppåt i eyebrow-stil.

**Plattformar & partners**
- Bryt ut till en egen liten sektion mellan outcomes och nästa steg. Logo-strip-känsla: chips med drake-line, hover fyller med drake-tint-soft. Lägg till en tunn rule över och under.

**Nästa steg + case-koppling**
- Förstärk case-kortet: lägg till klient-logo om SVG finns (annars initial-monogram i drake-sky-cirkel), tydlig "Bevis →" eyebrow, och flytta upp metrics till hero-positionen i kortet.
- "Hur vi tar det vidare"-listan blir numrerade steg (01/02/03) istället för checkmarks — matchar resten av sidan.

### CaseBody — sektion för sektion

**Hero**
- Lägg in breadcrumb-eyebrow ovanför titeln: `KUNDCASE / [BRANSCH/MODUL]`.
- Titeln blir två rader: kundnamn (display, stor) + caseTitle som "kicker" under i drake-sky.
- Modul-piller flyttas ner mot botten av hero och får pil-ikon vid hover för att signalera klickbarhet (de är redan länkar men ser passiva ut).
- Större outline-grafik (siffran från första kopplade modul som dekorativ accent i bakgrunden) speglar modulsidornas språk.

**Resultat**
- Tas upp till "above the fold"-position direkt efter hero, mer prominent. Korten får större metrics, gradient-text-effekten redan finns. Lägg till en tunn ikon-pelare till vänster om varje kort (uppåt-pil / siffra / certifikat-symbol baserat på label).
- Bakgrunden blir vit med subtil tint istället för full tint — låter resultaten ta ljuset.

**Utmaning + Lösning**
- Ny "Approach"-design: zigzag-tidslinje istället för bara numrerad lista — varje approach-punkt får en horisontell connector och en liten "phase"-label (Discover / Build / Scale, mappat på index).
- "Utmaning" lyfts till en pull-quote i serif-tunghet (eller display) snarare än brödtext.

**Teknik**
- Idag bara chip-rad. Uppgradera till två rader: stora chips för kärnteknik (de 2–3 första) + mindre chips för komplement. Lägg till en kort outro-mening: "Stacken vi byggde lösningen på."
- Lägg till en "Relaterade moduler"-rad i samma sektion — länkar tillbaka till modulerna som omger caset, så besökaren stannar i loopen.

### Bottom-nav (utanför Body-komponenterna)
- I `case.$slug.tsx` och `modul.$slug.tsx`: separator-linjen får en tunn drake-sky-accent över. CTA-knapparna får ikon-cirkel + pil-animation vid hover.

---

## Copy-puts

Behåller ton (sakligt, lite drivet, försäljnings-tight) men:

- **Taglines**: kortas och vassas där de är platta. Ex. `"Era processer, som de faktiskt går."` → `"Processen, som den faktiskt går — inte som den beskrivs."`
- **Problem-stycken**: skär 10–20% längd, byter passiv mot aktiv, plockar ett konkret substantiv per mening.
- **Solution-headings**: trimmas till 2–4 ord där möjligt, så de funkar som visuella ankare.
- **Outcome `label`-fält**: enhetlig form ("kortare time-to-data", "version av sanningen" är bra; "Healthcare ML i Qlik" och "MS"/"ERP"/"R&D" är inkonsekvent och blir omformulerat till verkliga labels).
- **Case `results`**: städas så alla har riktig metric eller tydlig kvalitativ markör — inte `"MS"` / `"R&D"` / `"∞"` som idag känns gåtfullt. Ex. `"MS"` → `"Featured"` med label "Lyft fram av Microsoft".
- **`title` på cases**: konsekvent struktur "[Vad vi byggde] för [vem/var]". Ex. `"Driver-baserad planering med writeback"` → behåll. `"AI för artikelkategorisering i SAP"` → `"NLP-driven artikelkategorisering i SAP"`.
- **`nextStep`**: alla moduler får samma struktur: "[Format/varaktighet]: [vad vi gör] + [vad du får ut]."

Jag listar inte varje förändring här utan applicerar dem genomgående med samma stilregler.

---

## Teknisk plan

**Filer som ändras**
- `src/components/drake/ModuleBody.tsx` — bygg om sektionsstruktur, lägg till nya delkomponenter inline.
- `src/components/drake/CaseBody.tsx` — samma.
- `src/content/modules.ts` — copy-puts i taglines, solution-headings, outcome-labels, nextStep.
- `src/content/cases.ts` — copy-puts i titles, results, approach-rader vid behov.
- `src/styles.css` — ev. 1–2 nya utility-klasser (`.da-bento-hero`, `.da-phase-label`) om motiverat, annars Tailwind in-line.

**Filer som INTE ändras**
- `src/components/drake/ReportSlides.tsx` (PDF-versionen)
- `src/routes/rapport.tsx`
- `src/routes/hub.tsx`, `index.tsx`, övriga sidor
- `src/components/drake/CoreSlides.tsx`

**Risk**
- Båda body-komponenterna är `print-page`-taggade och kapslas i scroll-trigger-motion. Nya delkomponenter måste behålla `print-page`-klassen där den finns idag, för att inte bryta `/rapport` om någon i framtiden länkar dit. Lätt att hålla.
- Bento-grid och zigzag-tidslinje måste testas vid 768–1024px så de inte spricker. Använder Tailwind responsiva varianter.

**Verifiering**
- Navigera till `/modul/dataplattform`, `/modul/process-intelligence`, `/case/partner-inkasso`, `/case/bi-retail` i preview och titta igenom alla sektioner.
- Screenshot vid 1218 (nuvarande viewport) + 768 + 1440.
- Bygg-check körs automatiskt.
