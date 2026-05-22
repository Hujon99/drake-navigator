import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileDown } from "lucide-react";
import { coreSlides } from "@/content/core-slides";
import { modules } from "@/content/modules";
import { caseBySlug } from "@/content/cases";
import { NavBar } from "@/components/drake/NavBar";
import { defaultExportState, encodeExportState, type ExportState } from "@/lib/export-state";
import type { ModuleSlug } from "@/content/types";

export const Route = createFileRoute("/export")({
  head: () => ({ meta: [{ title: "Skapa PDF — Drake Analytics" }] }),
  component: ExportPage,
});

type Step = 1 | 2 | 3;

function ExportPage() {
  const [state, setState] = useState<ExportState>(defaultExportState);
  const [step, setStep] = useState<Step>(1);

  const totalPages =
    1 /* cover */ +
    1 /* toc */ +
    state.core.length +
    state.modules.length +
    state.modules.filter((m) => m.includeCase).length;

  const canNext1 = state.core.length > 0 || state.modules.length > 0;
  const canNext2 = state.core.length > 0 || state.modules.length > 0;

  function toggleCore(n: number) {
    setState((s) => ({
      ...s,
      core: s.core.includes(n) ? s.core.filter((x) => x !== n) : [...s.core, n].sort((a, b) => a - b),
    }));
  }
  function toggleModule(slug: ModuleSlug) {
    setState((s) => {
      const exists = s.modules.find((m) => m.slug === slug);
      if (exists) return { ...s, modules: s.modules.filter((m) => m.slug !== slug) };
      return { ...s, modules: [...s.modules, { slug, includeCase: true }] };
    });
  }
  function toggleCase(slug: ModuleSlug) {
    setState((s) => ({
      ...s,
      modules: s.modules.map((m) => (m.slug === slug ? { ...m, includeCase: !m.includeCase } : m)),
    }));
  }
  function handleCreate() {
    const encoded = encodeExportState(state);
    const url = `/export-print?s=${encodeURIComponent(encoded)}`;
    // Open in a new tab so the report page is the only thing rendered there.
    const win = window.open(url, "_blank", "noopener");
    if (!win) {
      // Popup blocked — fall back to same-tab navigation
      window.location.href = url;
    }
  }

  return (
    <div className="min-h-screen bg-drake-wash pb-32">
      <NavBar crumbs={[{ label: "Skapa PDF" }]} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-28">
        {/* Header */}
        <div className="mb-10">
          <p className="da-eyebrow">Exportmodul</p>
          <h1 className="da-display mt-4 text-[clamp(36px,5vw,64px)]">
            Skapa en <span className="text-drake-sky">skräddarsydd</span> PDF
          </h1>
          <p className="da-ingress mt-4 max-w-2xl">
            Plocka exakt det innehåll ni vill ha med — grunddelar, moduler och kundcase. Vi sätter ihop en
            print-anpassad rapport som ni sparar som PDF.
          </p>
        </div>

        {/* Stepper */}
        <ol className="flex items-center gap-3 mb-10 text-xs font-display uppercase tracking-[0.14em]">
          {[
            { n: 1, label: "Grunddelar" },
            { n: 2, label: "Moduler & case" },
            { n: 3, label: "Granska & skapa" },
          ].map((s) => {
            const active = step === s.n;
            const done = step > s.n;
            return (
              <li key={s.n} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(s.n as Step)}
                  className={`h-8 w-8 rounded-full inline-flex items-center justify-center border transition-colors ${
                    active
                      ? "bg-drake-deep text-white border-drake-deep"
                      : done
                      ? "bg-drake-sky text-white border-drake-sky"
                      : "bg-white text-drake-mid border-drake-line"
                  }`}
                  aria-label={`Gå till steg ${s.n}`}
                >
                  {done ? <Check size={14} /> : s.n}
                </button>
                <span className={active ? "text-drake-deep" : "text-drake-mid"}>{s.label}</span>
                {s.n < 3 && <span className="w-8 h-px bg-drake-line ml-1" />}
              </li>
            );
          })}
        </ol>

        {/* Step content */}
        <div className="bg-white border border-drake-line rounded-2xl p-7 md:p-10 min-h-[480px]">
          {step === 1 && (
            <Step1
              selected={state.core}
              onToggle={toggleCore}
              onSelectAll={() => setState((s) => ({ ...s, core: coreSlides.map((c) => c.n) }))}
              onClear={() => setState((s) => ({ ...s, core: [] }))}
            />
          )}
          {step === 2 && (
            <Step2
              selected={state.modules}
              onToggleModule={toggleModule}
              onToggleCase={toggleCase}
              onSelectAll={() =>
                setState((s) => ({
                  ...s,
                  modules: modules.map((m) => ({ slug: m.slug, includeCase: true })),
                }))
              }
              onClear={() => setState((s) => ({ ...s, modules: [] }))}
            />
          )}
          {step === 3 && (
            <Step3
              state={state}
              totalPages={totalPages}
              onCustomer={(v) => setState((s) => ({ ...s, customer: v }))}
              onDate={(v) => setState((s) => ({ ...s, date: v }))}
            />
          )}
        </div>

        {/* Footer nav */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-display uppercase tracking-[0.14em] text-drake-mid hover:text-drake-deep"
              >
                <ArrowLeft size={14} /> Tillbaka
              </button>
            ) : (
              <Link
                to="/hub"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-display uppercase tracking-[0.14em] text-drake-mid hover:text-drake-deep"
              >
                <ArrowLeft size={14} /> Till översikt
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-drake-mid">
              {totalPages} sidor i rapporten
            </span>
            {step < 3 ? (
              <button
                type="button"
                disabled={step === 1 ? !canNext1 : !canNext2}
                onClick={() => setStep((s) => (s + 1) as Step)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-display uppercase tracking-[0.14em] bg-drake-deep text-white hover:bg-[#0a4146] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Nästa <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                disabled={totalPages <= 2}
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-display uppercase tracking-[0.14em] bg-drake-deep text-white hover:bg-[#0a4146] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FileDown size={14} /> Skapa PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Step 1 ───────────────── */
function Step1({
  selected,
  onToggle,
  onSelectAll,
  onClear,
}: {
  selected: number[];
  onToggle: (n: number) => void;
  onSelectAll: () => void;
  onClear: () => void;
}) {
  return (
    <div>
      <Header
        title="Välj grunddelar"
        sub="Kärnsekvensens slides — företagets story, värdekedjan och partnerskap. Allt ni vill att rapporten ska börja med."
        right={<BulkActions onSelectAll={onSelectAll} onClear={onClear} />}
      />
      <div className="mt-6 grid md:grid-cols-2 gap-3">
        {coreSlides.map((s) => {
          const checked = selected.includes(s.n);
          return (
            <label
              key={s.n}
              className={`flex gap-4 p-5 rounded-xl border cursor-pointer transition-all ${
                checked
                  ? "border-drake-sky bg-drake-tint-soft"
                  : "border-drake-line bg-white hover:border-drake-mute"
              }`}
            >
              <input
                type="checkbox"
                className="mt-1 accent-drake-deep h-4 w-4"
                checked={checked}
                onChange={() => onToggle(s.n)}
              />
              <div className="min-w-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-drake-sky text-sm">0{s.n}</span>
                  <h3 className="da-display text-lg text-drake-ink">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-drake-mid leading-relaxed">{s.body}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────── Step 2 ───────────────── */
function Step2({
  selected,
  onToggleModule,
  onToggleCase,
  onSelectAll,
  onClear,
}: {
  selected: ExportState["modules"];
  onToggleModule: (slug: ModuleSlug) => void;
  onToggleCase: (slug: ModuleSlug) => void;
  onSelectAll: () => void;
  onClear: () => void;
}) {
  return (
    <div>
      <Header
        title="Välj moduler & kundcase"
        sub="För varje vald modul kan ni välja att också inkludera dess kundcase. Skräddarsy efter vilken bransch och vilka utmaningar kunden har."
        right={<BulkActions onSelectAll={onSelectAll} onClear={onClear} />}
      />
      <div className="mt-6 grid md:grid-cols-2 gap-3">
        {modules.map((m) => {
          const sel = selected.find((s) => s.slug === m.slug);
          const checked = !!sel;
          const includeCase = sel?.includeCase ?? false;
          const linkedCase = caseBySlug(m.caseSlug);
          return (
            <div
              key={m.slug}
              className={`p-5 rounded-xl border transition-all ${
                checked
                  ? "border-drake-sky bg-drake-tint-soft"
                  : "border-drake-line bg-white"
              }`}
            >
              <label className="flex gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 accent-drake-deep h-4 w-4"
                  checked={checked}
                  onChange={() => onToggleModule(m.slug)}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-drake-sky text-sm">{m.number}</span>
                    <h3 className="da-display text-lg text-drake-ink">{m.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-drake-mid leading-relaxed">{m.tagline}</p>
                </div>
              </label>

              <div className="mt-4 pl-8">
                <label
                  className={`inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.14em] ${
                    checked ? "text-drake-deep cursor-pointer" : "text-drake-line cursor-not-allowed"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-drake-deep h-3.5 w-3.5"
                    checked={includeCase}
                    disabled={!checked}
                    onChange={() => onToggleCase(m.slug)}
                  />
                  Inkludera kundcase{linkedCase ? ` — ${linkedCase.client}` : ""}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────── Step 3 ───────────────── */
function Step3({
  state,
  totalPages,
  onCustomer,
  onDate,
}: {
  state: ExportState;
  totalPages: number;
  onCustomer: (v: string) => void;
  onDate: (v: string) => void;
}) {
  const selectedCores = coreSlides.filter((c) => state.core.includes(c.n));
  return (
    <div>
      <Header
        title="Granska & skapa"
        sub="Sista chansen att justera. Här fyller ni i kundens namn och datum som visas på omslaget."
      />

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-display uppercase tracking-[0.14em] text-drake-mid mb-2">
            Kundnamn (visas på omslag)
          </label>
          <input
            type="text"
            value={state.customer}
            onChange={(e) => onCustomer(e.target.value)}
            placeholder="t.ex. Acme AB"
            className="w-full px-4 py-3 rounded-md border border-drake-line bg-white focus:border-drake-sky focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-[0.14em] text-drake-mid mb-2">
            Datum
          </label>
          <input
            type="date"
            value={state.date}
            onChange={(e) => onDate(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-drake-line bg-white focus:border-drake-sky focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-drake-line bg-drake-wash p-6">
        <p className="da-eyebrow mb-3">Innehåll ({totalPages} sidor)</p>
        <ol className="space-y-2 text-sm text-drake-ink">
          <li className="flex gap-3">
            <span className="text-drake-mute font-display w-8">01</span>
            Omslag
          </li>
          <li className="flex gap-3">
            <span className="text-drake-mute font-display w-8">02</span>
            Innehållsförteckning
          </li>
          {selectedCores.map((c, i) => (
            <li key={c.n} className="flex gap-3">
              <span className="text-drake-mute font-display w-8">{String(i + 3).padStart(2, "0")}</span>
              {c.title}
            </li>
          ))}
          {state.modules.map((sel, i) => {
            const m = modules.find((mm) => mm.slug === sel.slug);
            if (!m) return null;
            const idx = selectedCores.length + 2 + i;
            const c = caseBySlug(m.caseSlug);
            return (
              <li key={m.slug}>
                <div className="flex gap-3">
                  <span className="text-drake-mute font-display w-8">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="text-drake-deep font-display uppercase tracking-wide text-xs mr-2">
                      {m.number}
                    </span>
                    {m.title}
                  </span>
                </div>
                {sel.includeCase && c && (
                  <div className="flex gap-3 mt-1 ml-8 text-drake-mid text-xs">
                    <span>↳ Kundcase: {c.client} — {c.title}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 rounded-xl bg-drake-deep/5 border border-drake-deep/15 p-4 text-sm text-drake-mid">
        När ni klickar <strong className="text-drake-deep">Skapa PDF</strong> öppnas en print-anpassad
        version och webbläsarens utskriftsdialog startar. Välj <em>"Spara som PDF"</em> som destination.
      </div>
    </div>
  );
}

/* ───────────────── Shared ───────────────── */
function Header({ title, sub, right }: { title: string; sub: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h2 className="da-display text-2xl md:text-3xl text-drake-ink">{title}</h2>
        <p className="mt-2 text-sm text-drake-mid max-w-2xl leading-relaxed">{sub}</p>
      </div>
      {right}
    </div>
  );
}

function BulkActions({ onSelectAll, onClear }: { onSelectAll: () => void; onClear: () => void }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        type="button"
        onClick={onSelectAll}
        className="text-xs font-display uppercase tracking-[0.14em] px-3 py-2 rounded-md border border-drake-line hover:border-drake-sky hover:text-drake-deep"
      >
        Markera alla
      </button>
      <button
        type="button"
        onClick={onClear}
        className="text-xs font-display uppercase tracking-[0.14em] px-3 py-2 rounded-md border border-drake-line hover:border-drake-sky hover:text-drake-deep"
      >
        Rensa
      </button>
    </div>
  );
}
