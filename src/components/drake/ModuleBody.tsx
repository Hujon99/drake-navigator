import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowRight, Database, Layers, Sparkles } from "lucide-react";
import { caseBySlug } from "@/content/cases";
import { modules } from "@/content/modules";
import type { ModuleContent } from "@/content/types";
import { fadeUp, stagger } from "@/lib/motion";

const SOLUTION_ICONS = [Layers, Sparkles, Database];

export function ModuleBody({ module: m }: { module: ModuleContent }) {
  const linkedCase = caseBySlug(m.caseSlug);
  const idx = modules.findIndex((x) => x.slug === m.slug);
  const total = modules.length;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <>
      {/* Hero — split layout */}
      <section
        ref={heroRef}
        className="print-page relative min-h-[92vh] flex flex-col justify-end overflow-hidden text-white da-grain"
        style={{ background: "linear-gradient(160deg, #0e5f66 0%, #168896 60%, #062f33 100%)" }}
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[40vw] h-[40vw] rounded-full bg-drake-sky/20 blur-3xl" />
          <div className="absolute bottom-10 -left-20 w-[30vw] h-[30vw] rounded-full bg-white/10 blur-3xl" />
        </motion.div>

        {/* Outline number behind right column */}
        <div className="absolute right-[-2vw] bottom-[-4vw] pointer-events-none select-none overflow-hidden">
          <p className="da-outline-number text-[36vw] md:text-[22vw] leading-none opacity-80">
            {m.number}
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-24 pt-32 w-full">
          {/* Module counter */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-display text-drake-sky text-sm tracking-[0.18em]">
              {m.number} / {String(total).padStart(2, "0")}
            </span>
            <span className="h-px w-12 bg-drake-sky/60" />
            <p className="da-eyebrow text-drake-sky">{m.title}</p>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-10 items-end">
            {/* Left: title + tagline */}
            <div className="md:col-span-7">
              <motion.h1
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.05 }}
                className="da-display text-[clamp(40px,6.2vw,92px)] leading-[0.95] text-white break-words hyphens-auto"
              >
                {m.title}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.1 }}
                className="mt-6 text-xl md:text-2xl text-white/85 max-w-2xl font-light leading-relaxed"
              >
                {m.tagline}
              </motion.p>
            </div>

            {/* Right: I korthet */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.15 }}
              className="md:col-span-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur p-6"
            >
              <p className="da-eyebrow text-drake-sky mb-5">I korthet</p>
              <ul className="space-y-4">
                {m.solution.slice(0, 3).map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-display text-drake-sky text-sm shrink-0 tracking-[0.14em] pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/90 text-[15px] leading-snug">{s.heading}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 flex items-center gap-3 text-white/70"
          >
            <ArrowDown size={14} className="animate-pulse" />
            <span className="da-eyebrow text-white/70">Scrolla för djupdykning</span>
          </motion.div>
        </div>
      </section>

      {/* Utmaningen — two columns with accent rule */}
      <section className="print-page py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <p className="da-eyebrow text-drake-mid">Utmaningen</p>
            <h2 className="da-display text-3xl md:text-4xl mt-5 text-drake-ink leading-tight">
              Där värdet läcker.
            </h2>
            <span className="da-rule mt-6" />
          </div>
          <div className="md:col-span-8 md:border-l md:border-drake-line md:pl-10">
            <p className="da-ingress text-drake-ink">{m.problem}</p>
          </div>
        </div>
      </section>

      {/* Vad vi gör — uppgraderade kort */}
      <section className="print-page py-20 md:py-28 bg-drake-tint-soft">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="da-eyebrow text-drake-mid">Vad vi gör</p>
              <h2 className="da-display text-3xl md:text-4xl mt-3 text-drake-ink">
                Tre rörelser, ett system.
              </h2>
            </div>
            <span className="da-rule" />
          </div>

          <motion.div
            variants={stagger(0.08)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-5"
          >
            {m.solution.map((s, i) => {
              const Icon = SOLUTION_ICONS[i % SOLUTION_ICONS.length];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="group bg-white rounded-xl p-7 border border-drake-line transition-shadow hover:shadow-[0_12px_40px_-20px_rgba(14,95,102,0.35)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-drake-sky text-2xl tracking-[0.04em] group-hover:text-drake-deep transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="w-10 h-10 rounded-lg bg-drake-tint-soft text-drake-deep flex items-center justify-center group-hover:bg-drake-sky group-hover:text-white transition-colors">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="da-display text-xl mt-5 text-drake-ink">{s.heading}</h3>
                  <p className="mt-3 text-drake-mid leading-relaxed text-[15px]">{s.body}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Outcomes — bento grid */}
      <section className="print-page py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="da-eyebrow text-drake-mid">Exempel & utfall</p>
              <h2 className="da-display text-3xl md:text-4xl mt-3 text-drake-ink">
                Det här rör sig.
              </h2>
            </div>
          </div>

          <motion.div
            variants={stagger(0.08)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-5"
          >
            {/* Hero outcome */}
            {m.outcome[0] && (
              <motion.div
                variants={fadeUp}
                className="md:col-span-2 md:row-span-2 rounded-2xl p-10 border border-drake-tint-strong relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #eaf4f4 0%, #ffffff 100%)" }}
              >
                <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-drake-sky/10 blur-3xl pointer-events-none" />
                <p className="da-eyebrow text-drake-mid relative z-10">{m.outcome[0].label}</p>
                {m.outcome[0].metric && (
                  <p className="font-display text-[clamp(64px,12vw,140px)] leading-none mt-4 da-gradient-text relative z-10">
                    {m.outcome[0].metric}
                  </p>
                )}
                <p className="mt-6 text-drake-mid leading-relaxed text-lg max-w-md relative z-10">
                  {m.outcome[0].body}
                </p>
              </motion.div>
            )}

            {m.outcome.slice(1).map((o, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl p-6 bg-white border border-drake-line"
              >
                <p className="da-eyebrow text-drake-mid">{o.label}</p>
                {o.metric && (
                  <p className="font-display text-5xl mt-3 leading-none da-gradient-text">
                    {o.metric}
                  </p>
                )}
                <p className="mt-4 text-drake-mid leading-relaxed text-sm">{o.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Plattformar & partners */}
      <section className="print-page py-14 bg-drake-wash border-y border-drake-rule">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="shrink-0">
            <p className="da-eyebrow text-drake-mid">Plattformar & partners</p>
            <p className="mt-1 text-sm text-drake-mute">Stacken vi bygger på.</p>
          </div>
          <div className="flex flex-wrap gap-2 md:border-l md:border-drake-line md:pl-10">
            {m.partners.map((p) => (
              <span
                key={p}
                className="px-3 py-1.5 rounded-md border border-drake-line bg-white text-sm text-drake-ink hover:bg-drake-tint-soft hover:border-drake-tint-strong transition-colors"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Nästa steg + case-koppling */}
      <section className="print-page py-20 md:py-28 bg-drake-deep text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[40vw] h-[40vw] rounded-full bg-drake-sky/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          <p className="da-eyebrow text-drake-sky">Nästa steg</p>
          <div className="grid md:grid-cols-5 gap-10 mt-8 items-start">
            <div className="md:col-span-3">
              <h3 className="da-display text-3xl md:text-4xl text-white leading-tight">
                Hur vi tar det vidare
              </h3>
              <p className="mt-5 text-white/85 text-lg leading-relaxed">{m.nextStep}</p>

              <ul className="mt-8 space-y-4">
                {[
                  { label: "Inget åtagande", body: "Vi börjar med en avgränsad insats utan långsiktig bindning." },
                  { label: "Konkret leverans", body: "Tydligt scope, definierad output, datum på leverans." },
                  { label: "Era data, era val", body: "Vi anpassar oss till er prioritering — inte tvärtom." },
                ].map((item, i) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="font-display text-drake-sky text-sm tracking-[0.14em] shrink-0 pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display uppercase tracking-[0.12em] text-sm text-white">
                        {item.label}
                      </p>
                      <p className="text-white/70 text-sm mt-1">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {linkedCase && (
              <Link
                to="/case/$slug"
                params={{ slug: linkedCase.slug }}
                preload="intent"
                className="md:col-span-2 group block rounded-2xl bg-white/5 border border-white/15 backdrop-blur p-7 hover:bg-white/10 hover:border-drake-sky transition-all"
              >
                <div className="flex items-center justify-between">
                  <p className="da-eyebrow text-drake-sky">Bevis</p>
                  <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-drake-sky group-hover:border-drake-sky transition-colors">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                {/* Metrics on top */}
                <div className="mt-6 grid grid-cols-3 gap-3 pb-6 border-b border-white/10">
                  {linkedCase.results.slice(0, 3).map((r, i) => (
                    <div key={i}>
                      <p className="font-display text-2xl text-drake-sky leading-none">{r.metric}</p>
                      <p className="text-[11px] text-white/60 mt-2 leading-snug">{r.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-drake-sky/15 border border-drake-sky/40 text-drake-sky font-display flex items-center justify-center text-base shrink-0">
                    {linkedCase.client
                      .replace(/^konfidentiell\s*[—-]\s*/i, "")
                      .trim()
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <h4 className="da-display text-lg text-white leading-tight truncate">
                      {linkedCase.client}
                    </h4>
                    <p className="text-white/70 text-xs mt-1 line-clamp-2">{linkedCase.title}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
