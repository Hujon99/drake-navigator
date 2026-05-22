# Drake Analytics — Interaktiv Säljpresentation (v1)

En webbaserad "choose your own adventure"-presentation som ersätter PowerPoint i kundmöten. Säljaren navigerar live mellan kärnsekvens, hubb (områdeskarta) och fördjupningsmoduler. Byggs i projektets befintliga stack (TanStack Start + React + Tailwind) med Drake Analytics designsystem fullt applicerat. Distribueras som publicerad Lovable-länk; React i bakgrunden påverkar inte delning.

## Designprinciper

Hämtas direkt från det uppladdade designsystemet:

- **Färg**: Drake Sky `#50BCBD` primär, `#168896` accent, `#5E5E5E` closing-yta, vit bakgrund. Inga gradienter som dominerar, ingen palett utanför teal-skalan.
- **Typografi**: Share Bold UPPERCASE för rubriker, Roboto för brödtext. Max 3 vikter / 4 storlekar per layout.
- **Logo**: alltid nere till höger utom på cover (Drake Cloud-bakgrund + logo).
- **Ton**: konsultativ, direkt, analytisk — aldrig säljig/buzzword-tung. Svenska genomgående.
- **Premium-känsla**: Framer Motion för slide-transitions (cross-fade + subtil scale/translate), Lenis för smooth scroll inom långa moduler, restrained motion — inte animationstung.

## Informationsarkitektur

```text
┌───────────────────────────────────────────────────┐
│  KÄRNSEKVENS (linjär, ← →)                        │
│  1. From Insight to Action  (cover)               │
│  2. Vilka vi är             (kultur)              │
│  3. Hela kedjan             (pipeline)            │
│  4. Partnerskap             (logos)               │
│  5. Kundens fokus           (dialog)              │
│  6. Områdeskarta            ──► HUB               │
└───────────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   [Modul 1..6]   [Kundcase]   ← Tillbaka till hub
```

**6 moduler**, varje med struktur *Problem → Vad vi gör → Exempel/utfall → Nästa steg*:

1. Dataplattform
2. Process Intelligence (AI/agentic-vinkel framhävd)
3. Applications / Automation / Agentic AI
4. BI & Analytics
5. Planning & Writeback
6. Data Strategy

**Kundcase**: 1 case per modul (placeholder-struktur, baserat på info i bifogad PPTX — Partner Inkasso, Siemens Energy, AbbVie m.fl.) + 1 multi-område-case ("Setlr"-strukturen).

## Navigation & interaktion

- **Persistent top-bar**: vänster = "← Tillbaka till översikt" (visas utanför hub), mitten = breadcrumb (Kärnsekvens 3/6 · Modul: BI & Analytics), höger = "Exportera PDF".
- **Kärnsekvens**: vänster/höger piltangenter + on-screen-pilar, slide 6 (hub) är klickbar karta.
- **Hub (områdeskarta)**: visuellt rutnät över de 6 modulerna i Drake-teal, hover lyfter kortet, klick går till modul.
- **Modulsida**: scrollbar one-pager (Lenis smooth scroll) med de 4 sektionerna + "Se kundcase"-CTA + "Tillbaka till översikt".
- **Tangentbord**: ← → mellan slides i kärnsekvensen, `Esc` tar tillbaka till hub från modul, `P` öppnar print-vy.
- **PDF-export**: `window.print()` mot en print-stylesheet som lägger varje slide/modul på en A4 landscape. Räcker för v1 — säljaren kan skicka PDF efter mötet.

## Tekniska val

- **Routing**: TanStack Start file-based routes — `/` (cover, redirect till `/slide/1`), `/slide/$n` (kärnsekvens 1-6), `/hub`, `/modul/$slug`, `/case/$slug`.
- **Animationer**: `motion/react` (Framer Motion) för slide-transitions via `AnimatePresence`, varianter delade i `src/lib/motion.ts`.
- **Smooth scroll**: `lenis` initierad i root-layout, pausad på slide-routes (där scroll inte behövs), aktiv på modulsidor.
- **Design tokens**: portera `colors_and_type.css` till `src/styles.css` som CSS-variabler (oklch där lämpligt, hex där brand kräver exakt match). Roboto + Share laddas via Google Fonts.
- **Assets**: kopiera logos, Drake Cloud-bakgrunder och Nordics-map från zip till `src/assets/drake/`.
- **Innehåll som data**: alla slides/moduler/case som typed objects i `src/content/` (`core-slides.ts`, `modules.ts`, `cases.ts`) så icke-tekniska kollegor lätt kan ändra text.
- **Inget backend / ingen auth / ingen DB** i v1 (Faser 4 — delningsläge — adresseras inte nu).

## Innehåll (placeholder-kvalitet)

Skrivs på svenska i konsultativ ton baserat på PPTX:en. Exempel-snippet för Dataplattform:

> "De flesta organisationer sitter på mer data än de kan använda. Vi bygger plattformen som faktiskt används — skalbar på Snowflake, Fabric eller Databricks, med governance och lineage från dag ett."

Partnerskapsslidens logos: Microsoft, Google, Qlik, Snowflake, Databricks, mpmX, Planacy, Aimplan, UiPath, DataRobot, Tableau, dbt (textbaserade chips i Drake-stil tills riktiga logos skaffas — markeras tydligt som placeholder). Här kan du eventuellt hämta loggorna att använda själv från internet  
  
Var inte rädd för premium parallax och scrolleffekter etc. Det är ett säljstöd men måste inte vara helt 100 kopplat till slide-deck format, utan vi kan utnyttja fördelarna som react/html ger samtidigt som slidekänsla kan bli backbone och den röda tråden så att det fortfarande fungerar bra som ett säljstöd

## Leverabler

- Publicerad Lovable-preview-länk (skickas i Slack-tråden).
- `/` öppnar cover → kärnsekvensen → hub → moduler.
- Kort `README.md` i repo-root: hur man lägger till/ändrar slides och moduler genom att redigera filerna i `src/content/`.
- PDF-export via `Cmd/Ctrl+P` med dedikerad print-stylesheet.

## Vad som *inte* ingår (v1)

- Delningsläge / unika kund-URLer / länktracking (Fas 4 — v2).
- Backend, inloggning, databas.
- Riktiga partner-logo-bilder (chips/placeholder tills filer levereras).

## Tekniska detaljer

- Filstruktur:
  ```text
  src/
    routes/
      index.tsx                  // redirect → /slide/1
      slide.$n.tsx               // kärnsekvens
      hub.tsx                    // områdeskarta
      modul.$slug.tsx            // modul one-pager
      case.$slug.tsx             // kundcase
      __root.tsx                 // top-bar, Lenis, AnimatePresence wrapper
    components/
      drake/  (Logo, SlideShell, ModuleSection, HubMap, NavBar, PrintLayout)
    content/
      core-slides.ts  modules.ts  cases.ts  partners.ts
    lib/
      motion.ts       lenis.ts
    styles.css        // Drake tokens + print stylesheet
    assets/drake/     // logos, cloud-bg, nordics-map
  ```
- Dependencies att lägga till: `motion`, `lenis`.
- TanStack `<Link>` med `preload="intent"` för snabba moduler-byten.
- Print stylesheet: `@page { size: A4 landscape; margin: 0 }`, döljer nav, forcerar `page-break-after` mellan slides.
- Tillgänglighet: semantiska `<section>`, fokus-states på alla klickbara kort, tangentbordsnav.