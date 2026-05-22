import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { Printer } from "lucide-react";
import { coreSlides } from "@/content/core-slides";
import { modules } from "@/content/modules";
import { caseBySlug } from "@/content/cases";
import { decodeExportState, type ExportState } from "@/lib/export-state";
import { Logo } from "@/components/drake/Logo";
import {
  CoverSlide,
  WhoSlide,
  ChainSlide,
  PartnersSlide,
  DialogSlide,
} from "./slide.$n";
import { ModuleBody } from "./modul.$slug";
import { CaseBody } from "./case.$slug";

const searchSchema = z.object({ s: z.string().optional() });

export const Route = createFileRoute("/rapport")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Rapport — Drake Analytics" }] }),
  component: ReportPage,
});

function ReportPage() {
  const { s } = Route.useSearch();
  const state = useMemo<ExportState | null>(() => (s ? decodeExportState(s) : null), [s]);

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

  return (
    <div className="bg-white">
      {/* Sticky toolbar (hidden in print) */}
      <div className="no-print sticky top-0 z-50 bg-drake-deep text-white px-6 py-3 flex items-center justify-between shadow-lg" data-no-print>
        <div className="flex items-center gap-3 text-sm">
          <Logo variant="light" className="h-5" />
          <span className="font-display uppercase tracking-[0.14em] text-xs hidden md:inline">
            Rapport — granska och spara som PDF
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/export"
            className="text-xs font-display uppercase tracking-[0.14em] text-white/70 hover:text-white"
          >
            ← Tillbaka
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-white text-drake-deep px-4 py-2 rounded-md font-display uppercase tracking-[0.14em] text-xs hover:bg-drake-sky hover:text-white transition-colors"
          >
            <Printer size={14} /> Skriv ut / Spara som PDF
          </button>
        </div>
      </div>

      {/* Core slides */}
      {cores.map((slide) => (
        <section key={`core-${slide.n}`} className="print-page min-h-screen flex">
          {slide.kind === "cover" && <CoverSlide slide={slide} />}
          {slide.kind === "who" && <WhoSlide slide={slide} />}
          {slide.kind === "chain" && <ChainSlide slide={slide} />}
          {slide.kind === "partners" && <PartnersSlide slide={slide} />}
          {slide.kind === "dialog" && <DialogSlide slide={slide} />}
        </section>
      ))}

      {/* Modules + linked cases */}
      {selectedModules.map((m) => {
        const linkedCase = m.includeCase ? caseBySlug(m.data.caseSlug) : null;
        return (
          <div key={`mod-${m.slug}`}>
            <ModuleBody module={m.data} />
            {linkedCase && <CaseBody case={linkedCase} />}
          </div>
        );
      })}
    </div>
  );
}
