import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { modules } from "@/content/modules";
import { cases } from "@/content/cases";
import { NavBar } from "@/components/drake/NavBar";
import { fadeUp, stagger } from "@/lib/motion";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [{ title: "Översikt — Drake Analytics" }],
  }),
  component: HubPage,
});

function HubPage() {
  const multiCase = cases.find((c) => c.slug === "setlr-multi");

  return (
    <div className="min-h-screen bg-white pt-24 pb-24">
      <NavBar crumbs={[{ label: "Områdeskarta" }]} />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div variants={stagger()} initial="initial" animate="animate" className="mb-12">
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="h-px w-10 bg-drake-sky" />
            <p className="da-eyebrow">Kundens fokus — Områdeskarta</p>
          </motion.div>
          <motion.h1 variants={fadeUp} className="da-display mt-4 text-[clamp(36px,5vw,68px)] max-w-3xl leading-[1.05]">
            Var är ni idag? <span className="text-drake-sky">Vad är mest relevant för er?</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="da-ingress mt-5 max-w-2xl">
            Sex områden, ett ekosystem. Välj det som ligger närmast er situation just nu — varje område går på djupet: problem, vad vi gör, exempel och nästa steg.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex gap-3 text-xs font-display uppercase tracking-[0.14em]">
            <Link to="/slide/$n" params={{ n: "1" }} className="inline-flex items-center gap-2 text-drake-mid hover:text-drake-deep">
              <ArrowLeft size={14} /> Tillbaka till kärnsekvens
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={stagger(0.05)} initial="initial" animate="animate" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => (
            <motion.div key={m.slug} variants={fadeUp}>
              <Link
                to="/modul/$slug"
                params={{ slug: m.slug }}
                preload="intent"
                className="group block h-full rounded-2xl border border-drake-line bg-white p-7 hover:border-drake-sky hover:shadow-[0_30px_60px_-30px_rgba(80,188,189,0.45)] hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                {/* Hover gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-drake-tint-soft via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                {/* Outline number */}
                <span className="absolute -right-3 -bottom-6 font-display text-[120px] leading-none text-drake-tint-soft group-hover:text-drake-tint-strong transition-colors pointer-events-none select-none">
                  {m.number}
                </span>
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-display text-drake-sky text-2xl tracking-wide">{m.number}</span>
                    <ArrowRight size={18} className="text-drake-mute group-hover:text-drake-sky group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="da-display text-2xl text-drake-ink">{m.title}</h3>
                  <p className="mt-3 text-sm text-drake-mid leading-relaxed">{m.tagline}</p>

                  <div className="mt-6 pt-5 border-t border-drake-rule flex flex-wrap gap-1.5">
                    {m.partners.slice(0, 3).map((p) => (
                      <span key={p} className="text-[11px] px-2 py-1 rounded bg-drake-wash text-drake-mid">{p}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Multi-case CTA */}
        {multiCase && (
          <motion.div variants={fadeUp} initial="initial" animate="animate" className="mt-10">
            <Link
              to="/case/$slug"
              params={{ slug: multiCase.slug }}
              className="block rounded-2xl bg-drake-deep text-white p-8 md:p-10 relative overflow-hidden hover:bg-[#0a4146] transition-colors da-grain"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="da-eyebrow text-drake-sky">Multi-område kundcase</p>
                  <h3 className="da-display text-3xl md:text-4xl mt-3 text-white">{multiCase.client}</h3>
                  <p className="text-white/80 mt-3 max-w-2xl">{multiCase.title} — agentic AI, process intelligence och dataplattform i samma case.</p>
                </div>
                <div className="inline-flex items-center gap-2 font-display uppercase tracking-[0.14em] text-sm text-drake-sky group">
                  Se caset <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
