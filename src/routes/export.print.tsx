import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { coreSlides } from "@/content/core-slides";
import { modules } from "@/content/modules";
import { caseBySlug } from "@/content/cases";
import { decodeExportState, type ExportState } from "@/lib/export-state";
import { Logo } from "@/components/drake/Logo";

const searchSchema = z.object({ s: z.string().optional() });

export const Route = createFileRoute("/export/print")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Rapport — Drake Analytics" }] }),
  component: ExportPrintPage,
});

function ExportPrintPage() {
  const { s } = Route.useSearch();
  const state = useMemo<ExportState | null>(() => (s ? decodeExportState(s) : null), [s]);
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    document.body.classList.add("export-print-active");
    return () => document.body.classList.remove("export-print-active");
  }, []);

  useEffect(() => {
    if (!state) return;
    let cancelled = false;
    const trigger = () => {
      if (!cancelled) {
        window.print();
        setPrinted(true);
      }
    };
    // Wait for fonts and a frame so layout settles
    const fontsReady = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready;
    Promise.resolve(fontsReady).then(() => {
      setTimeout(trigger, 350);
    });
    const onAfter = () => setPrinted(true);
    window.addEventListener("afterprint", onAfter);
    return () => {
      cancelled = true;
      window.removeEventListener("afterprint", onAfter);
    };
  }, [state]);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-drake-wash p-10">
        <div className="bg-white border border-drake-line rounded-2xl p-10 max-w-md text-center">
          <h1 className="da-display text-2xl text-drake-ink">Inget rapportinnehåll</h1>
          <p className="mt-3 text-drake-mid text-sm">
            Det här länkar saknar urval. Börja om från exportmodulen.
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

  // Build TOC entries
  const tocEntries: string[] = [
    ...cores.map((c) => c.title),
    ...selectedModules.flatMap((m) => {
      const arr = [`${m.data.number}. ${m.data.title}`];
      if (m.includeCase) {
        const c = caseBySlug(m.data.caseSlug);
        if (c) arr.push(`↳ Kundcase: ${c.client}`);
      }
      return arr;
    }),
  ];

  const dateLabel = formatSwedishDate(state.date);

  return (
    <div className="export-print-root">
      {/* On-screen toolbar (hidden in print) */}
      <div className="no-print sticky top-0 z-50 bg-drake-deep text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <Logo variant="light" className="h-5" />
          <span className="font-display uppercase tracking-[0.14em] text-xs">Rapport — granska och spara som PDF</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/export" className="text-xs font-display uppercase tracking-[0.14em] px-3 py-2 rounded hover:bg-white/10">
            ← Tillbaka
          </Link>
          <button
            onClick={() => window.print()}
            className="text-xs font-display uppercase tracking-[0.14em] px-4 py-2 rounded bg-drake-sky text-drake-deep hover:bg-white"
          >
            Skriv ut / Spara PDF
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
              <ModulePage module={m} />
              {caseData && <CasePage caseData={caseData} />}
            </div>
          );
        })}
      </div>

      {printed && (
        <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 bg-drake-deep text-white text-sm rounded-full px-5 py-3 shadow-lg">
          Klar! Du kan stänga den här fliken.
        </div>
      )}
    </div>
  );
}

/* ───────────────── Pages ───────────────── */

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
            Drake Analytics — Rapport
          </span>
        </div>

        <div className="mt-auto">
          <p className="text-xs font-display uppercase tracking-[0.22em] text-drake-sky">
            {customer ? "Rapport för" : "Skräddarsydd översikt"}
          </p>
          <h1 className="da-display mt-4 text-white text-[64px] leading-[1.05] tracking-tight">
            {customer || "Från insikt till handling"}
          </h1>
          <p className="mt-6 text-white/85 text-lg max-w-2xl leading-relaxed">
            En personlig sammanställning av Drake Analytics expertis, lösningsområden och kundcase —
            anpassad efter era prioriteringar.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 max-w-xl">
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

function TocPage({ entries }: { entries: string[] }) {
  return (
    <section className="export-page">
      <PageHeader eyebrow="Innehåll" title="Vad rapporten innehåller" />
      <ol className="mt-10 space-y-3">
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

function CorePage({ slide }: { slide: (typeof coreSlides)[number] }) {
  return (
    <section className="export-page">
      <PageHeader eyebrow={slide.eyebrow} title={slide.title} />
      <p className="mt-10 da-ingress max-w-3xl">{slide.body}</p>
      <PageFooter />
    </section>
  );
}

function ModulePage({ module: m }: { module: (typeof modules)[number] }) {
  return (
    <section className="export-page">
      <PageHeader eyebrow={`Modul ${m.number}`} title={m.title} />
      <p className="mt-2 text-drake-mid italic">{m.tagline}</p>

      <div className="mt-8">
        <p className="da-eyebrow mb-2">Problemet</p>
        <p className="text-drake-ink leading-relaxed">{m.problem}</p>
      </div>

      <div className="mt-8">
        <p className="da-eyebrow mb-3">Vad vi gör</p>
        <div className="grid grid-cols-3 gap-4">
          {m.solution.map((s, i) => (
            <div key={s.heading} className="rounded-lg border border-drake-line p-4 bg-drake-wash/50">
              <span className="font-display text-drake-sky text-xs">
                0{i + 1}
              </span>
              <h4 className="da-display text-base mt-2 text-drake-ink">{s.heading}</h4>
              <p className="text-xs text-drake-mid mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="da-eyebrow mb-3">Utfall</p>
        <div className="grid grid-cols-3 gap-4">
          {m.outcome.map((o) => (
            <div key={o.label} className="border-t-2 border-drake-sky pt-3">
              {o.metric && (
                <p className="font-display text-2xl text-drake-deep">{o.metric}</p>
              )}
              <p className="text-xs font-display uppercase tracking-[0.12em] text-drake-mid mt-1">
                {o.label}
              </p>
              <p className="text-xs text-drake-mid mt-2 leading-relaxed">{o.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[1.6fr_1fr] gap-6">
        <div>
          <p className="da-eyebrow mb-2">Nästa steg</p>
          <p className="text-drake-ink leading-relaxed">{m.nextStep}</p>
        </div>
        <div>
          <p className="da-eyebrow mb-2">Partners & verktyg</p>
          <div className="flex flex-wrap gap-1.5">
            {m.partners.map((p) => (
              <span key={p} className="text-[11px] px-2 py-1 rounded bg-drake-wash text-drake-mid border border-drake-line">
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

function CasePage({ caseData: c }: { caseData: NonNullable<ReturnType<typeof caseBySlug>> }) {
  return (
    <section className="export-page">
      <PageHeader eyebrow={`Kundcase — ${c.client}`} title={c.title} />

      <div className="mt-8">
        <p className="da-eyebrow mb-2">Utmaningen</p>
        <p className="text-drake-ink leading-relaxed">{c.challenge}</p>
      </div>

      <div className="mt-8">
        <p className="da-eyebrow mb-3">Vad vi gjorde</p>
        <ul className="space-y-2">
          {c.approach.map((a, i) => (
            <li key={i} className="flex gap-3 text-drake-ink">
              <span className="font-display text-drake-sky text-sm w-6 shrink-0">0{i + 1}</span>
              <span className="leading-relaxed">{a}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <p className="da-eyebrow mb-3">Resultat</p>
        <div className="grid grid-cols-3 gap-4">
          {c.results.map((r) => (
            <div key={r.label} className="border-t-2 border-drake-sky pt-3">
              <p className="font-display text-2xl text-drake-deep">{r.metric}</p>
              <p className="text-xs font-display uppercase tracking-[0.12em] text-drake-mid mt-1">
                {r.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="da-eyebrow mb-2">Teknik</p>
        <div className="flex flex-wrap gap-1.5">
          {c.tech.map((t) => (
            <span key={t} className="text-[11px] px-2 py-1 rounded bg-drake-wash text-drake-mid border border-drake-line">
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
    return new Intl.DateTimeFormat("sv-SE", { year: "numeric", month: "long", day: "numeric" }).format(d);
  } catch {
    return iso;
  }
}
