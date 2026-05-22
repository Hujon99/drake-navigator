
## Mål

Ge säljaren ett snabbt sätt att bygga en skräddarsydd PDF-rapport från befintligt innehåll:
1. Välj vilka av de 5 **grunddelarna** (kärnsekvensen) som ska med.
2. Välj vilka av de **6 modulerna** som ska med — och för varje vald modul om dess **kundcase** också ska ingå.
3. Klicka *Skapa PDF* → en print-optimerad sida öppnas och webbläsarens "Spara som PDF" triggas.

## UX-flöde

```text
[Hub] ──"Skapa PDF"──▶ /export (wizard)
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
   Steg 1: Grund     Steg 2: Moduler    Steg 3: Granska
   (5 checkboxar)    (6 kort med två    + omslagsinfo
                      checkboxar var:    (kundnamn, datum)
                      modul / case)      ─▶ "Skapa PDF"
                                            │
                                            ▼
                                    /export/print?state=…
                                    (auto window.print)
```

- **Steg 1** – lista de 5 grundslides från `coreSlides` med titel + kort beskrivning. "Markera alla / inga".
- **Steg 2** – grid med de 6 modulerna från `modules.ts`. Varje kort: modulnamn, tagline, två toggles ("Inkludera modul", "Inkludera kundcase"). Case-toggle disabled när modulen inte är vald.
- **Steg 3** – sammanfattning + två valfria fält: **Kundnamn** och **Datum** (default idag), används på omslaget. Knapp *Skapa PDF*.

## Print-rendering

En egen route `/export/print` läser urvalet från URL (base64-encoded JSON) och renderar allt vertikalt staplat i ett print-optimerat layout. När sidan mountat och fonter laddat → `window.print()`. Användaren väljer "Spara som PDF" i sitt OS.

Fördelar med detta framför jsPDF/pdf-lib:
- Återanvänder vår befintliga styling — slides ser identiska ut.
- Ingen extra dependency, ingen serverless rendering att underhålla.
- Användaren får riktig vektoriserad text + selectable text i PDF.

### Sidstruktur i print-vyn

1. **Omslag** (alltid) – Drake-logo, "Rapport för {kundnamn}", datum, lista av vad rapporten innehåller.
2. **Innehållsförteckning** (alltid) – numrerad lista.
3. **Grunddelar** – en print-anpassad version per vald `coreSlide` (kind: cover/who/chain/partners/dialog).
4. **Moduler** – per vald modul: problem, vad-vi-gör, utfall, partners, nästa steg.
5. **Kundcase** – per vald case: klient, utmaning, approach, resultat, tech.

Varje "slide" är en `<section class="print-page">` med `break-after: page` så det blir exakt en A4-sida per block.

## Filer som skapas

- `src/routes/export.tsx` – wizard (3 steg, lokal state, ingen backend).
- `src/routes/export.print.tsx` – print-vy, auto-`window.print()` efter mount.
- `src/components/export/StepCoreSelector.tsx`
- `src/components/export/StepModuleSelector.tsx`
- `src/components/export/StepReview.tsx`
- `src/components/export/print/CorePrintSlide.tsx` – switch på `kind` → 5 print-varianter.
- `src/components/export/print/ModulePrintSlide.tsx`
- `src/components/export/print/CasePrintSlide.tsx`
- `src/components/export/print/CoverPrintSlide.tsx`
- `src/lib/export-state.ts` – typer + base64 encode/decode av urvalsstate.

## Filer som ändras

- `src/routes/hub.tsx` – lägg till "Skapa PDF"-knapp i headern bredvid HUB/PDF.
- `src/styles.css` – ny `@media print` block: A4 page-size, dölj nav/chrome, force-color-adjust, sidbrytningar, kompakta typsnitt för print.

## Tekniska detaljer

- **State-transport**: `btoa(JSON.stringify({ core: number[], modules: { slug, includeCase }[], customer, date }))` i query-param. Print-routen avkodar i loader/component.
- **Print-CSS**: `@page { size: A4; margin: 16mm 14mm }`. Class `.print-page { break-after: page; -webkit-print-color-adjust: exact; print-color-adjust: exact }`. Wrappa allt utanför print-content i `@media print { display: none }`.
- **Auto-print**: `useEffect` med `document.fonts.ready.then(() => window.print())`. Lägg `afterprint` listener som visar en "Klar — stäng fliken"-overlay.
- **Inga nya npm-paket** behövs.

## Edge cases

- Inget valt i något steg → *Nästa*/*Skapa PDF* disabled med tooltip.
- Print-route utan state → visa felmeddelande med länk tillbaka till `/export`.
- Långa textblock i moduler/cases → CSS `orphans: 3; widows: 3` så stycken inte splittras illa.

## Out of scope (för denna iteration)

- Server-renderad PDF (kan läggas till senare via puppeteer i en server-route om browser-print inte räcker).
- Anpassa enskilda textstycken före export.
- Spara/återanvända exportkonfigurationer.
- Branding/färganpassning per kund.
