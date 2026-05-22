import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { moduleBySlug } from "@/content/modules";
import type { CaseContent, ModuleSlug } from "@/content/types";
import { fadeUp, stagger } from "@/lib/motion";

export function CaseBody({ case: c }: { case: CaseContent }) {
  const linkedModules = c.modules.map((s: ModuleSlug) => moduleBySlug(s)!).filter(Boolean);
  return (
    <>
      {/* Hero */}
      <section className="print-page relative min-h-[80vh] flex items-end text-white overflow-hidden da-grain"
        style={{ background: "linear-gradient(140deg, #262626 0%, #0e5f66 100%)" }}>
        <div className="absolute -top-20 -right-20 w-[50vw] h-[50vw] rounded-full bg-drake-sky/15 blur-3xl pointer-events-none" />
        <motion.div variants={stagger()} initial="initial" animate="animate" className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pb-20 pt-32 w-full">
          <motion.p variants={fadeUp} className="da-eyebrow text-drake-sky">Kundcase</motion.p>
          <motion.h1 variants={fadeUp} className="da-display mt-5 text-[clamp(40px,7vw,108px)] leading-[0.95] text-white">{c.client}</motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-xl md:text-2xl text-white/85 max-w-3xl font-light">{c.title}</motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {linkedModules.map((m) => (
              <Link key={m.slug} to="/modul/$slug" params={{ slug: m.slug }} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-drake-sky hover:border-drake-sky text-xs font-display uppercase tracking-[0.12em] backdrop-blur transition-colors">
                {m.title}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </section>


      {/* Results bar */}
      <section className="print-page py-16 bg-drake-tint-soft">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="da-eyebrow text-drake-mid mb-8">Resultat</p>
          <div className="grid md:grid-cols-3 gap-6">
            {c.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-7 border border-drake-line"
              >
                <p className="font-display text-5xl md:text-6xl leading-none da-gradient-text">{r.metric}</p>
                <p className="mt-3 text-drake-mid">{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge + Approach */}
      <section className="print-page py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12">
          <div>
            <p className="da-eyebrow">Utmaning</p>
            <p className="mt-5 text-lg text-drake-ink leading-relaxed">{c.challenge}</p>
          </div>
          <div>
            <p className="da-eyebrow">Lösning</p>
            <ul className="mt-5 space-y-4">
              {c.approach.map((a, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display text-drake-sky text-lg shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-drake-ink leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="print-page py-16 bg-drake-deep text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="da-eyebrow text-drake-sky">Teknik</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.tech.map((t) => (
              <span key={t} className="px-4 py-2 rounded-md bg-white/5 border border-white/20 text-sm">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
