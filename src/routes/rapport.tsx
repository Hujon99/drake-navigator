import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Download, Loader2 } from "lucide-react";
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
} from "@/components/drake/CoreSlides";
import { ModuleBody } from "@/components/drake/ModuleBody";
import { CaseBody } from "@/components/drake/CaseBody";


const searchSchema = z.object({ s: z.string().optional() });
const pdfPageWidth = 1600;
const pdfPageHeight = Math.round((pdfPageWidth * 210) / 297);

export const Route = createFileRoute("/rapport")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Rapport — Drake Analytics" }] }),
  component: ReportPage,
});

function ReportPage() {
  const { s } = Route.useSearch();
  const state = useMemo<ExportState | null>(() => (s ? decodeExportState(s) : null), [s]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExportPdf = async () => {
    setIsExporting(true);
    setExportError(null);

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      // Ensure all required font faces are loaded before rasterizing,
      // otherwise html2canvas may fall back to system fonts mid-capture.
      const fontSpecs = [
        '500 16px "Barlow Condensed"',
        '600 16px "Barlow Condensed"',
        '700 16px "Barlow Condensed"',
        '800 16px "Barlow Condensed"',
        'italic 700 16px "Barlow Condensed"',
        '300 16px "Roboto"',
        '400 16px "Roboto"',
        '500 16px "Roboto"',
        '700 16px "Roboto"',
        '900 16px "Roboto"',
        'italic 400 16px "Roboto"',
      ];
      await Promise.all(fontSpecs.map((spec) => document.fonts.load(spec).catch(() => null)));
      await document.fonts.ready;

      const pages = Array.from(document.querySelectorAll<HTMLElement>(".print-page"));
      if (pages.length === 0) throw new Error("Inga rapportsidor hittades.");

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });

      for (const [index, page] of pages.entries()) {
        const canvas = await html2canvas(page, {
          backgroundColor: "#ffffff",
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          logging: false,
          width: pdfPageWidth,
          height: pdfPageHeight,
          windowWidth: pdfPageWidth,
          windowHeight: pdfPageHeight,
          onclone: (clonedDocument) => {
            clonedDocument.documentElement.classList.add("pdf-capture-mode");
            clonedDocument.body.classList.add("pdf-capture-mode");
            clonedDocument.querySelectorAll<HTMLElement>(".print-page").forEach((clonedPage) => {
              clonedPage.style.width = `${pdfPageWidth}px`;
              clonedPage.style.height = `${pdfPageHeight}px`;
              clonedPage.style.minHeight = `${pdfPageHeight}px`;
              clonedPage.style.maxHeight = `${pdfPageHeight}px`;
              clonedPage.style.overflow = "hidden";
            });
          },
        });

        if (index > 0) pdf.addPage("a4", "landscape");
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, 297, 210, undefined, "FAST");
      }

      const customer = state?.customer.trim() ? state.customer.trim().replace(/[^a-z0-9åäö_-]+/gi, "-") : "rapport";
      pdf.save(`drake-analytics-${customer}.pdf`);
    } catch (error) {
      console.error(error);
      setExportError("PDF:en kunde inte skapas. Ladda om sidan och försök igen.");
    } finally {
      setIsExporting(false);
    }
  };

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
            onClick={handleExportPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-2 bg-white text-drake-deep px-4 py-2 rounded-md font-display uppercase tracking-[0.14em] text-xs hover:bg-drake-sky hover:text-white transition-colors"
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {isExporting ? "Skapar PDF" : "Ladda ner PDF"}
          </button>
        </div>
      </div>

      {exportError && (
        <div className="no-print bg-red-50 px-6 py-3 text-sm text-red-700" data-no-print>
          {exportError}
        </div>
      )}

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
