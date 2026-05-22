# Drake Analytics — Interaktiv säljpresentation

Interaktivt säljstöd för Drake Analytics. En "choose your own adventure"-presentation som ersätter/kompletterar PowerPoint i kundmöten.

## Struktur

- **Kärnsekvens** (`/slide/1` → `/slide/4`): linjär intro — From Insight to Action, Vilka vi är, Hela kedjan, Partnerskap. Sista sliden leder direkt till områdeskartan.
- **Områdeskarta / Hub** (`/hub`): central navigationsyta till de sex erbjudandemodulerna.
- **Modulsidor** (`/modul/<slug>`): one-pagers med Problem → Vad vi gör → Exempel/utfall → Nästa steg.
- **Kundcase** (`/case/<slug>`): resultatdrivna case kopplade till en eller flera moduler.

## Navigation

- `← →` piltangenter byter slide i kärnsekvensen.
- `Esc` hoppar tillbaka till områdeskartan.
- `P` (eller knappen uppe till höger / `Cmd-P`) öppnar print-vy → spara som PDF.
- Hub-knappen i toppmenyn är alltid en väg tillbaka.

## Innehåll ändras i `src/content/`

Allt textinnehåll bor som typade TypeScript-objekt — inga JSX-ändringar behövs för att uppdatera copy.

| Fil | Vad |
| --- | --- |
| `src/content/core-slides.ts` | Texterna i kärnsekvensen (slides 1–4). |
| `src/content/modules.ts` | De sex modulerna: tagline, problem, lösningssektioner, utfall, nästa steg, partners. |
| `src/content/cases.ts` | Kundcase: client, utmaning, approach, resultat, teknik. |
| `src/content/partners.ts` | Partner-chips grupperade efter kategori. |

### Lägga till en ny modul

1. Lägg till slug i `ModuleSlug`-unionen i `src/content/types.ts`.
2. Lägg till ett objekt i `modules`-arrayen i `src/content/modules.ts`.
3. Lägg till motsvarande kundcase i `cases.ts` (eller peka `caseSlug` mot ett befintligt).

Modulen dyker automatiskt upp på hub-sidan, i kundens fokus-slide (slide 5) och får en egen route på `/modul/<slug>`.

### Lägga till ett nytt kundcase

1. Lägg till slug i `CaseSlug`-unionen i `src/content/types.ts`.
2. Lägg till objektet i `cases`-arrayen i `src/content/cases.ts`.
3. Sätt `caseSlug` på en befintlig modul om du vill länka det från modulsidan.

## Designsystem

Drake-färger, typsnitt (Share Bold + Roboto) och tokens ligger i `src/styles.css`. Logos och bilder i `src/assets/drake/`.

- Primär: `#50BCBD` (Drake Sky)
- Accent: `#168896` (Drake Ground)
- Hero/closing: `#0E5F66` (Drake Deep) / `#5E5E5E` (Closing Gray)
- Headings: Share Bold UPPERCASE
- Brödtext: Roboto

## Vad som inte ingår (v1)

- Inget delningsläge / unika kund-URLer (Fas 4 / v2).
- Ingen backend, ingen inloggning, ingen databas.
- Riktiga partner-logotyper levereras separat — text-chips används som placeholder.
