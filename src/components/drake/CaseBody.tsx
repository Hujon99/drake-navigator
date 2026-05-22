import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { moduleBySlug } from "@/content/modules";
import type { CaseContent, ModuleSlug } from "@/content/types";
import { fadeUp, stagger } from "@/lib/motion";

const PHASE_LABELS = ["Discover", "Build", "Scale", "Operate", "Evolve"];

export function CaseBody({ case: c }: { case: CaseContent }) {
  const linkedModules = c.modules.map((s: ModuleSlug) => moduleBySlug(s)!).filter(Boolean);
  const heroModule = linkedModules[0];

  return (
    <>
      {/* Hero */}
      <section
        className="print-page relative min-h-[80vh] flex items-end text-white overflow-hidden da-grain"
        style={{ background: "linear-gradient(140deg, #262626 0%, #0e5f66 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-[50vw] h-[50vw] rounded-full bg-drake-sky/15 blur-3xl pointer-events-none" />

        {/* Outline number from primary linked module */}
        {heroModule && (
          <div className="absolute right-[-3vw] bottom-[-6vw] pointer-events-none select-none overflow-hidden">
            <p className="da-outline-number text-[36vw] md:text-[22vw] leading-none opacity-70">
              {heroModule.number}
            </p>
          </div>
        )}

        <motion.div
          variants={stagger()}
          initial="initial"
          animate="animate"
          className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pb-20 pt-32 w-full"
        >
          {/* Breadcrumb eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-7 text-drake-sky">
            <span className="da-eyebrow text-drake-sky">Kundcase</span>
            {heroModule && (
              <>
                <span className="h-px w-8 bg-drake-sky/60" />
                <span className="da-eyebrow text-drake-sky">{heroModule.title}</span>
              </>
            )}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="da-display text-[clamp(40px,7vw,108px)] leading-[0.95] text-white"
          >
            {c.client}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-xl md:text-2xl text-drake-sky max-w-3xl font-light"
          >
            {c.title}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-2">
            {linkedModules.map((m) => (
              <Link
                key={m.slug}
                to="/modul/$slug"
                params={{ slug: m.slug }}
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-drake-sky hover:border-drake-sky text-xs font-display uppercase tracking-[0.12em] backdrop-blur transition-colors"
              >
                {m.title}
                <ArrowUpRight
                  size={12}
                  className="opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Resultat — prominenta direkt efter hero */}
      <section className="print-page py-20 md:py-24 bg-white relative">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-drake-tint-soft to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="da-eyebrow text-drake-mid">Resultat</p>
              <h2 className="da-display text-3xl md:text-4xl mt-3 text-drake-ink">
                Det här levererade vi.
              </h2>
            </div>
            <span className="da-rule" />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {c.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-7 border border-drake-line hover:border-drake-tint-strong transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-drake-sky scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-lg bg-drake-tint-soft text-drake-deep flex items-center justify-center shrink-0 mt-1">
                    <TrendingUp size={18} strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-5xl md:text-6xl leading-none da-gradient-text break-words">
                      {r.metric}
                    </p>
                    <p className="mt-4 text-drake-mid leading-relaxed text-sm">{r.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Utmaning + Lösning (zigzag-tidslinje) */}
      <section className="print-page py-20 md:py-28 bg-drake-tint-soft">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12">
          {/* Utmaning som pull quote */}
          <div className="md:col-span-5">
            <p className="da-eyebrow text-drake-mid">Utmaningen</p>
            <p className="mt-6 da-display text-2xl md:text-[28px] text-drake-ink leading-snug">
              <span className="text-drake-sky">“</span>
              {c.challenge}
              <span className="text-drake-sky">”</span>
            </p>
            <span className="da-rule mt-8" />
          </div>

          {/* Approach som tidslinje */}
          <div className="md:col-span-7">
            <p className="da-eyebrow text-drake-mid">Vår approach</p>
            <ol className="mt-6 relative">
              <span className="absolute left-[14px] top-2 bottom-2 w-px bg-drake-line" aria-hidden />
              {c.approach.map((a, i) => {
                const phase = PHASE_LABELS[i] ?? `Steg ${i + 1}`;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="relative pl-12 pb-7 last:pb-0"
                  >
                    <span className="absolute left-0 top-0 w-7 h-7 rounded-full bg-white border-2 border-drake-sky text-drake-deep font-display text-xs flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="da-eyebrow text-drake-sky">{phase}</p>
                    <p className="mt-2 text-drake-ink leading-relaxed">{a}</p>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Teknik + relaterade moduler */}
      <section className="print-page py-16 md:py-20 bg-drake-deep text-white relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[50vw] h-[30vw] rounded-full bg-drake-sky/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10 grid md:grid-cols-2 gap-12">
          <div>
            <p className="da-eyebrow text-drake-sky">Teknik</p>
            <h3 className="da-display text-2xl md:text-3xl mt-3 text-white">
              Stacken vi byggde lösningen på.
            </h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {c.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-md bg-white/10 border border-white/25 text-sm font-display tracking-wide"
                >
                  {t}
                </span>
              ))}
              {c.tech.slice(3).map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-md bg-white/5 border border-white/15 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {linkedModules.length > 0 && (
            <div className="md:border-l md:border-white/15 md:pl-12">
              <p className="da-eyebrow text-drake-sky">Relaterade moduler</p>
              <h3 className="da-display text-2xl md:text-3xl mt-3 text-white">
                Fortsätt djupare.
              </h3>
              <ul className="mt-6 space-y-3">
                {linkedModules.map((m) => (
                  <li key={m.slug}>
                    <Link
                      to="/modul/$slug"
                      params={{ slug: m.slug }}
                      preload="intent"
                      className="group flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-drake-sky transition-colors"
                    >
                      <span className="flex items-center gap-4 min-w-0">
                        <span className="font-display text-drake-sky text-sm tracking-[0.14em] shrink-0">
                          {m.number}
                        </span>
                        <span className="font-display uppercase tracking-[0.08em] text-sm text-white truncate">
                          {m.title}
                        </span>
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-white/60 group-hover:text-drake-sky group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
