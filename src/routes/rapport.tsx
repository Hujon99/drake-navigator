import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { z } from "zod";
import { Database, Layers, ShieldCheck, Sparkles, Check } from "lucide-react";
import { coreSlides } from "@/content/core-slides";
import { modules } from "@/content/modules";
import { caseBySlug } from "@/content/cases";
import { decodeExportState, type ExportState } from "@/lib/export-state";
import { Logo } from "@/components/drake/Logo";
import { PARTNER_GROUPS } from "@/components/drake/PartnerGrid";

const searchSchema = z.object({ s: z.string().optional() });

export const Route = createFileRoute("/rapport")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Rapport — Drake Analytics" }] }),
  component: ExportPrintPage,
});

function ExportPrintPage() {
  const { s } = Route.useSearch();
  const state = useMemo<ExportState | null>(() => (s ? decodeExportState(s) : null), [s]);

  function requestPrint() {
    window.focus();
    window.print();
  }

  useEffect(() => {
    document.body.classList.add("export-print-active");
    return () => document.body.classList.remove("export-print-active");
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-drake-wash p-10">
        <div className="bg-white border border-drake-line rounded-2xl p-10 max-w-md text-center">
          <h1 className="da-display text-2xl text-drake-ink">Inget rapportinnehåll</h1>
          <p className="mt-3 text-drake-mid text-sm">
            Den här länken saknar urval. Börja om från exportmodulen.
          </p>
          <Link
            to="/export"
            className="inline-block mt-6 px-5 py-3 rounded-md bg-drake-deep text-white text-sm font-display uppercase tracking-[0.14em]"
          >
            Till exportmodulen
          </Link>
        </div>
      </div>
    );
  }

  const cores = coreSlides.filter((c) => state.core.includes(c.n));
  const selectedModules = state.modules
    .map((m) => ({ ...m, data: modules.find((mm) => mm.slug === m.slug) }))
    .filter((m): m is typeof m & { data: NonNullable<typeof m.data> } => !!m.data);

  const tocEntries: string[] = [
    ...cores.map((c) => c.title),
    ...selectedModules.flatMap((m) => {
      const arr = [`${m.data.number}. ${m.data.title}`];
      if (m.includeCase) {
        const c = caseBySlug(m.data.caseSlug);
        if (c) arr.push(`Kundcase: ${c.client}`);
      }
      return arr;
    }),
  ];

  const dateLabel = formatSwedishDate(state.date);

  return (
    <div className="export-print-root">
      <div className="no-print sticky top-0 z-50 bg-drake-deep text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 text-sm">
          <Logo variant="light" className="h-5" />
          <span className="font-display uppercase tracking-[0.14em] text-xs hidden md:inline">
            Rapport — granska och spara som PDF
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/export"
            className="text-xs font-display uppercase tracking-[0.14em] px-3 py-2 rounded hover:bg-white/10"
          >
            ← Tillbaka
          </Link>
          <button
            onClick={requestPrint}
            className="text-xs font-display uppercase tracking-[0.14em] px-5 py-2.5 rounded bg-drake-sky text-drake-deep hover:bg-white font-semibold"
          >
            Skriv ut / Spara som PDF
          </button>
        </div>
      </div>

      <div className="export-print-pages">
        <CoverPage customer={state.customer} dateLabel={dateLabel} entries={tocEntries} />
        <TocPage entries={tocEntries} />

        {cores.map((c) => (
          <CorePage key={c.n} slide={c} />
        ))}

        {selectedModules.map((sel) => {
          const m = sel.data;
          const caseData = sel.includeCase ? caseBySlug(m.caseSlug) : null;
          return (
            <div key={m.slug}>
              <ModuleHeroPage module={m} />
              <ModuleDetailPage module={m} />
              {caseData && <CasePage caseData={caseData} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────── Cover ───────────────── */

function CoverPage({
  customer,
  dateLabel,
  entries,
}: {
  customer: string;
  dateLabel: string;
  entries: string[];
}) {
  return (
    <section className="export-page export-cover">
      <div className="export-cover__bg" />
      <div className="export-cover__content">
        <div className="flex items-center justify-between">
          <Logo variant="light" className="h-8" />
          <span className="text-xs font-display uppercase tracking-[0.18em] text-white/80">
            Drake Analytics · Sedan 2014
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-drake-sky" />
            <p className="text-xs font-display uppercase tracking-[0.22em] text-drake-sky">
              {customer ? "Rapport för" : "Skräddarsydd översikt"}
            </p>
          </div>
          <h1 className="da-display text-white text-[56px] leading-[0.95] tracking-tight">
            {customer || "From Insight to Action"}
          </h1>
          <p className="mt-3 text-drake-sky text-2xl font-display uppercase tracking-wide">
            From Insight to Action
          </p>
          <p className="mt-8 text-white/85 text-base max-w-2xl leading-relaxed">
            En personlig sammanställning av Drake Analytics expertis, lösningsområden och kundcase —
            anpassad efter era prioriteringar.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-xl">
            <Stat label="Specialister" value="50+" />
            <Stat label="År av leveranser" value="10+" />
            <Stat label="Oberoende" value="100%" />
          </div>

          <div className="mt-10 pt-6 border-t border-white/20 grid grid-cols-2 gap-8 max-w-xl">
            <div>
              <p className="text-[10px] font-display uppercase tracking-[0.18em] text-drake-sky">Datum</p>
              <p className="text-white mt-1 text-base">{dateLabel}</p>
            </div>
            <div>
              <p className="text-[10px] font-display uppercase tracking-[0.18em] text-drake-sky">Avsnitt</p>
              <p className="text-white mt-1 text-base">{entries.length} st</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-drake-sky/60 pt-2">
      <p className="font-display text-3xl text-white">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.18em] mt-1 text-drake-sky font-semibold">
        {label}
      </p>
    </div>
  );
}

/* ───────────────── TOC ───────────────── */

function TocPage({ entries }: { entries: string[] }) {
  return (
    <section className="export-page">
      <PageHeader eyebrow="Innehåll" title="Vad rapporten innehåller" />
      <ol className="mt-8 space-y-2">
        {entries.map((e, i) => (
          <li key={i} className="flex items-baseline gap-5 border-b border-drake-rule py-3">
            <span className="font-display text-drake-sky text-sm w-10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-drake-ink">{e}</span>
          </li>
        ))}
      </ol>
      <PageFooter />
    </section>
  );
}

/* ───────────────── Core slides ───────────────── */

function CorePage({ slide }: { slide: (typeof coreSlides)[number] }) {
  return (
    <section className="export-page">
      <PageHeader eyebrow={slide.eyebrow} title={slide.title} />

      {slide.kind === "cover" && <CoreCover slide={slide} />}
      {slide.kind === "who" && <CoreWho slide={slide} />}
      {slide.kind === "chain" && <CoreChain slide={slide} />}
      {slide.kind === "partners" && <CorePartners slide={slide} />}
      {slide.kind === "dialog" && <CoreDialog slide={slide} />}

      <PageFooter />
    </section>
  );
}

function CoreCover({ slide }: { slide: (typeof coreSlides)[number] }) {
  return (
    <div className="mt-8 flex-1">
      <p className="da-display text-[56px] leading-[0.95] text-drake-ink">
        From <span className="da-gradient-text">Insight</span> to Action.
      </p>
      <p className="mt-6 da-ingress max-w-2xl">{slide.body}</p>
      <div className="mt-10 grid grid-cols-3 gap-6 max-w-xl">
        {[
          { n: "50+", l: "Specialister" },
          { n: "10+", l: "År av leveranser" },
          { n: "100%", l: "Oberoende" },
        ].map((s) => (
          <div key={s.l} className="border-t-2 border-drake-sky pt-3">
            <p className="font-display text-4xl text-drake-deep">{s.n}</p>
            <p className="text-[10px] uppercase tracking-[0.18em] mt-2 text-drake-mid font-semibold">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoreWho({ slide }: { slide: (typeof coreSlides)[number] }) {
  const stats = [
    { n: "2014", l: "Grundat" },
    { n: "~50", l: "Specialister" },
    { n: "4", l: "Kontor" },
    { n: "100%", l: "Oberoende" },
  ];
  const roles = [
    "Data Engineers",
    "Data Scientists",
    "AI Engineers",
    "BI Consultants",
    "Business Consultants",
    "Solution Architects",
    "Low Code Engineers",
  ];
  const offices = ["Stockholm", "Göteborg", "Linköping", "Jönköping"];
  return (
    <div className="mt-8">
      <p className="da-ingress max-w-3xl">{slide.body}</p>

      <div className="mt-8 grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.l} className="border-t-2 border-drake-sky pt-3">
            <p className="font-display text-3xl text-drake-deep">{s.n}</p>
            <p className="da-eyebrow mt-2 text-drake-mid text-[10px]">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="da-eyebrow text-drake-mid mb-3">Våra roller</p>
        <div className="flex flex-wrap gap-1.5">
          {roles.map((r) => (
            <span
              key={r}
              className="text-xs px-3 py-1.5 rounded-full bg-drake-tint-soft border border-drake-tint-strong text-drake-deep"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="da-eyebrow text-drake-mid mb-3">Kontor i Sverige</p>
        <div className="flex flex-wrap gap-2">
          {offices.map((o) => (
            <span
              key={o}
              className="text-sm px-4 py-2 rounded-md bg-white border border-drake-line text-drake-ink font-display uppercase tracking-wide"
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoreChain({ slide }: { slide: (typeof coreSlides)[number] }) {
  const steps = [
    { label: "Datakällor", sub: "ERP · CRM · WMS · SaaS · IoT", icon: Database },
    { label: "Plattform", sub: "Lakehouse · ELT · Governance", icon: Layers },
    { label: "Trusted data", sub: "Modeller · Kvalitet · Lineage", icon: ShieldCheck },
    { label: "Värde", sub: "BI · AI · Planning · Agenter", icon: Sparkles },
  ];
  const layers = [
    { t: "Automation", d: "Reducerar manuellt arbete i flödet" },
    { t: "Agentic AI", d: "Beslutsstöd och autonom handling" },
    { t: "Process Intelligence", d: "Synliggör hur processerna faktiskt går" },
  ];
  return (
    <div className="mt-8">
      <p className="da-ingress max-w-3xl">{slide.body}</p>

      <div className="mt-8 grid grid-cols-4 gap-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-xl border border-drake-line p-4 bg-white relative"
            >
              <div className="relative w-11 h-11 rounded-full bg-white border-2 border-drake-sky flex items-center justify-center mb-3">
                <Icon size={18} className="text-drake-deep" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-drake-deep text-white text-[9px] font-display flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="font-display uppercase tracking-wide text-drake-ink text-sm">
                {s.label}
              </p>
              <p className="mt-1 text-[11px] text-drake-mid leading-relaxed">{s.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <p className="da-eyebrow text-drake-mid mb-3">Genomgående lager</p>
        <div className="grid grid-cols-3 gap-3">
          {layers.map((l) => (
            <div
              key={l.t}
              className="px-4 py-3 rounded-xl bg-drake-tint-soft border border-drake-tint-strong"
            >
              <p className="font-display uppercase tracking-wide text-sm text-drake-deep">{l.t}</p>
              <p className="text-[11px] text-drake-mid mt-1">{l.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CorePartners({ slide }: { slide: (typeof coreSlides)[number] }) {
  return (
    <div className="mt-8">
      <p className="da-ingress max-w-3xl">{slide.body}</p>

      <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl">
        {[
          { n: "5", l: "Partnerprogram" },
          { n: "20+", l: "Plattformar" },
          { n: "100%", l: "Oberoende" },
        ].map((s) => (
          <div key={s.l} className="border-t-2 border-drake-sky pt-3">
            <p className="font-display text-3xl text-drake-deep">{s.n}</p>
            <p className="da-eyebrow mt-2 text-drake-mid text-[10px]">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
        {PARTNER_GROUPS.map((g) => (
          <div key={g.label}>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-drake-sky" />
              <p className="da-eyebrow text-drake-mid text-[10px]">{g.label}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((t) => (
                <span
                  key={t.name}
                  className="inline-flex items-center gap-1.5 rounded-md border border-drake-line bg-white px-2 py-1 text-[11px] text-drake-ink"
                >
                  <span
                    aria-hidden
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoreDialog({ slide }: { slide: (typeof coreSlides)[number] }) {
  return (
    <div className="mt-8">
      <p className="da-display text-3xl text-drake-ink max-w-3xl leading-[1.1]">
        Var är ni idag?<br />
        <span className="da-gradient-text">Vad är mest relevant för er?</span>
      </p>
      <p className="mt-6 da-ingress max-w-3xl">{slide.body}</p>

      <div className="mt-8">
        <p className="da-eyebrow text-drake-mid mb-3">Våra lösningsområden</p>
        <div className="grid grid-cols-2 gap-2">
          {modules.map((m) => (
            <div
              key={m.slug}
              className="px-4 py-3 rounded-lg border border-drake-line bg-white flex items-start gap-3"
            >
              <span className="font-display text-drake-sky text-base shrink-0">{m.number}</span>
              <div>
                <p className="font-display uppercase tracking-wide text-sm text-drake-ink">
                  {m.title}
                </p>
                <p className="text-[11px] text-drake-mid mt-0.5">{m.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Module ───────────────── */

function ModuleHeroPage({ module: m }: { module: (typeof modules)[number] }) {
  return (
    <section
      className="export-page export-cover"
      style={{ color: "#fff" }}
    >
      <div
        className="export-cover__bg"
        style={{
          background:
            "linear-gradient(160deg, #0e5f66 0%, #168896 60%, #062f33 100%)",
        }}
      />
      <div className="export-cover__content relative">
        {/* Giant outline number */}
        <div
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            right: "-6mm",
            bottom: "-12mm",
            fontFamily: '"Barlow Condensed", Impact, sans-serif',
            fontWeight: 700,
            fontSize: "320px",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.18)",
          }}
        >
          {m.number}
        </div>

        <div className="flex items-center justify-between">
          <Logo variant="light" className="h-7" />
          <span className="text-xs font-display uppercase tracking-[0.18em] text-white/80">
            Modul {m.number}
          </span>
        </div>

        <div className="mt-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-drake-sky" />
            <p className="da-eyebrow text-drake-sky">Lösningsområde</p>
          </div>
          <h2 className="da-display text-white text-[56px] leading-[0.95]">{m.title}</h2>
          <p className="mt-6 text-white/85 text-xl font-light max-w-2xl leading-relaxed">
            {m.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}

function ModuleDetailPage({ module: m }: { module: (typeof modules)[number] }) {
  return (
    <section className="export-page">
      <PageHeader eyebrow={`Modul ${m.number}`} title={m.title} />

      <div className="mt-6">
        <p className="da-eyebrow mb-2">Problemet</p>
        <p className="text-drake-ink leading-relaxed text-sm">{m.problem}</p>
      </div>

      <div className="mt-6">
        <p className="da-eyebrow mb-3">Vad vi gör</p>
        <div className="grid grid-cols-3 gap-3">
          {m.solution.map((s, i) => (
            <div
              key={s.heading}
              className="rounded-lg border border-drake-line p-3 bg-drake-tint-soft/40"
            >
              <span className="font-display text-drake-sky text-base">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="da-display text-sm mt-2 text-drake-ink leading-tight">{s.heading}</h4>
              <p className="text-[11px] text-drake-mid mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="da-eyebrow mb-3">Exempel & utfall</p>
        <div className="grid grid-cols-3 gap-3">
          {m.outcome.map((o) => (
            <div key={o.label} className="border-t-2 border-drake-sky pt-3">
              {o.metric && (
                <p className="font-display text-3xl text-drake-deep leading-none">{o.metric}</p>
              )}
              <p className="text-[10px] font-display uppercase tracking-[0.14em] text-drake-mid mt-2">
                {o.label}
              </p>
              <p className="text-[11px] text-drake-mid mt-1.5 leading-relaxed">{o.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[1.4fr_1fr] gap-5">
        <div>
          <p className="da-eyebrow mb-2">Nästa steg</p>
          <p className="text-drake-ink leading-relaxed text-sm">{m.nextStep}</p>
          <ul className="mt-3 space-y-1.5 text-xs text-drake-mid">
            {["Inget åtagande", "Konkret leverans definierad", "Era data, era prioriteringar"].map(
              (b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check size={13} className="mt-0.5 text-drake-sky shrink-0" />
                  <span>{b}</span>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <p className="da-eyebrow mb-2">Plattformar & partners</p>
          <div className="flex flex-wrap gap-1.5">
            {m.partners.map((p) => (
              <span
                key={p}
                className="text-[10px] px-2 py-1 rounded bg-drake-wash text-drake-mid border border-drake-line"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <PageFooter />
    </section>
  );
}

/* ───────────────── Case ───────────────── */

function CasePage({ caseData: c }: { caseData: NonNullable<ReturnType<typeof caseBySlug>> }) {
  return (
    <section className="export-page">
      <div
        className="-mx-[16mm] -mt-[18mm] px-[16mm] py-[14mm] text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(140deg, #262626 0%, #0e5f66 100%)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-10 bg-drake-sky" />
          <p className="da-eyebrow text-drake-sky">Kundcase</p>
        </div>
        <h2 className="da-display text-white text-[40px] leading-[0.95]">{c.client}</h2>
        <p className="mt-3 text-white/85 text-base font-light max-w-2xl leading-relaxed">
          {c.title}
        </p>
      </div>

      <div className="mt-6">
        <p className="da-eyebrow mb-3">Resultat</p>
        <div className="grid grid-cols-3 gap-3">
          {c.results.map((r) => (
            <div
              key={r.label}
              className="rounded-lg border border-drake-line p-4 bg-drake-tint-soft/40"
            >
              <p className="font-display text-3xl text-drake-deep leading-none">{r.metric}</p>
              <p className="text-[10px] font-display uppercase tracking-[0.14em] text-drake-mid mt-2">
                {r.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <p className="da-eyebrow mb-2">Utmaning</p>
          <p className="text-drake-ink leading-relaxed text-sm">{c.challenge}</p>
        </div>
        <div>
          <p className="da-eyebrow mb-2">Lösning</p>
          <ul className="space-y-2">
            {c.approach.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm text-drake-ink">
                <span className="font-display text-drake-sky text-sm shrink-0 w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <p className="da-eyebrow mb-2">Teknik</p>
        <div className="flex flex-wrap gap-1.5">
          {c.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-1 rounded bg-drake-deep text-white"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <PageFooter />
    </section>
  );
}

/* ───────────────── Shared chrome ───────────────── */

function PageHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="flex items-start justify-between gap-6 pb-4 border-b border-drake-rule">
      <div>
        <p className="da-eyebrow">{eyebrow}</p>
        <h2 className="da-display text-3xl mt-2 text-drake-ink leading-[1.1]">{title}</h2>
      </div>
      <Logo variant="dark" className="h-5 mt-1 shrink-0" />
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="export-page__footer">
      <span>Drake Analytics — From Insight to Action</span>
      <span>drakeanalytics.se</span>
    </footer>
  );
}

function formatSwedishDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}
