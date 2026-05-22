import { ArrowRight } from "lucide-react";
import type { CaseContent, ModuleContent } from "@/content/types";

/**
 * Dedicated single-page (landscape A4) slides used by the PDF report.
 * These are designed to fit cleanly within one capture frame, unlike
 * ModuleBody / CaseBody which are long scroll pages.
 */

export function ModuleSlide({ module: m }: { module: ModuleContent }) {
  return (
    <section
      className="print-page relative min-h-screen w-full flex text-white da-grain overflow-hidden"
      style={{ background: "linear-gradient(135deg, #062f33 0%, #0e5f66 55%, #168896 100%)" }}
    >
      {/* Decorative number */}
      <div className="absolute -right-10 -bottom-24 pointer-events-none select-none">
        <p className="da-outline-number text-[42vh] leading-none opacity-80">{m.number}</p>
      </div>
      <div className="absolute -top-32 -right-32 w-[40vw] h-[40vw] rounded-full bg-drake-sky/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-12 gap-10 w-full max-w-[1400px] mx-auto px-14 py-16">
        {/* Left: title + tagline + problem */}
        <div className="col-span-5 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-drake-sky" />
            <p className="da-eyebrow text-drake-sky">Modul {m.number}</p>
          </div>
          <h2 className="da-display text-[clamp(40px,5.2vw,80px)] leading-[0.95] text-white">
            {m.title}
          </h2>
          <p className="mt-5 text-lg text-white/85 font-light leading-relaxed">{m.tagline}</p>

          <div className="mt-8 pt-6 border-t border-white/15">
            <p className="da-eyebrow text-drake-sky mb-3">Problemet</p>
            <p className="text-white/85 leading-relaxed">{m.problem}</p>
          </div>

          <div className="mt-auto pt-8">
            <p className="da-eyebrow text-drake-sky mb-3">Plattformar & partners</p>
            <div className="flex flex-wrap gap-2">
              {m.partners.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-md border border-white/25 text-xs"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: solutions + outcomes */}
        <div className="col-span-7 flex flex-col gap-6">
          <div>
            <p className="da-eyebrow text-drake-sky mb-4">Vad vi gör</p>
            <div className="grid grid-cols-3 gap-3">
              {m.solution.slice(0, 3).map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 border border-white/15"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  <span className="font-display text-drake-sky text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="da-display text-base mt-2 text-white leading-tight">{s.heading}</h3>
                  <p className="mt-2 text-white/75 text-xs leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="da-eyebrow text-drake-sky mb-4">Exempel & utfall</p>
            <div className="grid grid-cols-3 gap-4">
              {m.outcome.slice(0, 3).map((o, i) => (
                <div key={i} className="border-t-2 border-drake-sky pt-4">
                  {o.metric && (
                    <p className="font-display text-3xl leading-none text-drake-sky">{o.metric}</p>
                  )}
                  <p className="da-eyebrow mt-2 text-white/70 text-[10px]">{o.label}</p>
                  <p className="mt-2 text-white/80 text-xs leading-relaxed">{o.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-auto rounded-xl p-5 border border-white/15"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <p className="da-eyebrow text-drake-sky mb-2">Nästa steg</p>
            <p className="text-white/85 text-sm leading-relaxed">{m.nextStep}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseSlide({ case: c }: { case: CaseContent }) {
  return (
    <section className="print-page relative min-h-screen w-full flex flex-col bg-white overflow-hidden">
      {/* Hero band */}
      <div
        className="relative text-white da-grain overflow-hidden"
        style={{ background: "linear-gradient(140deg, #262626 0%, #0e5f66 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-[35vw] h-[35vw] rounded-full bg-drake-sky/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-14 py-12 w-full">
          <p className="da-eyebrow text-drake-sky">Kundcase</p>
          <h2 className="da-display mt-3 text-[clamp(36px,4.6vw,68px)] leading-[0.95] text-white">
            {c.client}
          </h2>
          <p className="mt-3 text-lg text-white/85 font-light max-w-3xl">{c.title}</p>
        </div>
      </div>

      {/* Results bar */}
      <div className="bg-drake-tint-soft border-y border-drake-line">
        <div className="max-w-[1400px] mx-auto px-14 py-6 grid grid-cols-3 gap-6">
          {c.results.slice(0, 3).map((r, i) => (
            <div key={i} className="flex items-baseline gap-4">
              <p className="font-display text-4xl leading-none text-drake-sky">{r.metric}</p>
              <p className="text-drake-mid text-sm">{r.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Challenge + Approach */}
      <div className="flex-1 max-w-[1400px] mx-auto px-14 py-8 grid grid-cols-2 gap-12 w-full">
        <div>
          <p className="da-eyebrow text-drake-mid">Utmaning</p>
          <p className="mt-4 text-drake-ink leading-relaxed">{c.challenge}</p>
        </div>
        <div>
          <p className="da-eyebrow text-drake-mid">Lösning</p>
          <ul className="mt-4 space-y-3">
            {c.approach.slice(0, 5).map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-display text-drake-sky shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-drake-ink text-sm leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech footer */}
      <div className="bg-drake-deep text-white">
        <div className="max-w-[1400px] mx-auto px-14 py-5 flex items-center gap-5">
          <p className="da-eyebrow text-drake-sky shrink-0 flex items-center gap-2">
            Teknik <ArrowRight size={12} />
          </p>
          <div className="flex flex-wrap gap-2">
            {c.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-md border border-white/25 text-xs"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
