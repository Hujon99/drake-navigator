import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { moduleBySlug, modules } from "@/content/modules";
import { caseBySlug } from "@/content/cases";
import type { ModuleContent } from "@/content/types";
import { NavBar } from "@/components/drake/NavBar";
import { useLenis } from "@/lib/use-lenis";
import { fadeUp, stagger } from "@/lib/motion";

export const Route = createFileRoute("/modul/$slug")({
  component: ModulePage,
  loader: ({ params }) => {
    const m = moduleBySlug(params.slug);
    if (!m) throw notFound();
    return { module: m };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.module.title ?? "Modul"} — Drake Analytics` }],
  }),
});

function ModulePage() {
  const { module: m } = Route.useLoaderData();
  const linkedCase = caseBySlug(m.caseSlug);
  useLenis(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const idx = modules.findIndex((x) => x.slug === m.slug);
  const next = modules[(idx + 1) % modules.length];

  return (
    <div className="min-h-screen bg-white">
      <NavBar crumbs={[{ label: "Modul", to: "/hub" }, { label: m.title }]} variant="dark" />

      {/* Hero */}
      <section
        ref={heroRef}
        className="print-page relative min-h-[92vh] flex items-end overflow-hidden text-white da-grain"
        style={{ background: "linear-gradient(160deg, #0e5f66 0%, #168896 60%, #0a4146 100%)" }}
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[40vw] h-[40vw] rounded-full bg-drake-sky/20 blur-3xl" />
          <div className="absolute bottom-10 -left-20 w-[30vw] h-[30vw] rounded-full bg-white/10 blur-3xl" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pb-20 pt-32 w-full">
          <motion.p variants={fadeUp} initial="initial" animate="animate" className="da-eyebrow text-drake-sky">
            Modul {m.number}
          </motion.p>
          <motion.h1
            variants={fadeUp} initial="initial" animate="animate" transition={{ delay: 0.05 }}
            className="da-display mt-5 text-[clamp(44px,8vw,120px)] leading-[0.95] text-white"
          >
            {m.title}
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}
            className="mt-6 text-xl md:text-2xl text-white/85 max-w-3xl font-light"
          >
            {m.tagline}
          </motion.p>
        </div>
      </section>

      {/* Problem */}
      <Section eyebrow="Problemet" bg="white">
        <p className="da-ingress text-drake-ink max-w-3xl">{m.problem}</p>
      </Section>

      {/* Solution */}
      <Section eyebrow="Vad vi gör" bg="tint">
        <motion.div variants={stagger(0.08)} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} className="grid md:grid-cols-3 gap-5">
          {m.solution.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white rounded-xl p-7 border border-drake-line">
              <span className="font-display text-drake-sky text-2xl">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="da-display text-xl mt-4 text-drake-ink">{s.heading}</h3>
              <p className="mt-3 text-drake-mid leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Outcomes */}
      <Section eyebrow="Exempel & utfall" bg="white">
        <motion.div variants={stagger(0.08)} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} className="grid md:grid-cols-3 gap-5">
          {m.outcome.map((o, i) => (
            <motion.div key={i} variants={fadeUp} className="border-t-2 border-drake-sky pt-6">
              {o.metric && (
                <p className="font-display text-5xl md:text-6xl text-drake-deep leading-none">{o.metric}</p>
              )}
              <p className="da-eyebrow mt-3 text-drake-mid">{o.label}</p>
              <p className="mt-3 text-drake-mid leading-relaxed">{o.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners */}
        <div className="mt-12 pt-8 border-t border-drake-rule">
          <p className="da-eyebrow text-drake-mid mb-4">Plattformar & partners</p>
          <div className="flex flex-wrap gap-2">
            {m.partners.map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-md border border-drake-line text-sm">{p}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* Next step + case */}
      <Section eyebrow="Nästa steg" bg="deep">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <h3 className="da-display text-3xl md:text-4xl text-white">
              Hur vi tar det vidare
            </h3>
            <p className="mt-5 text-white/85 text-lg leading-relaxed">{m.nextStep}</p>
            <ul className="mt-6 space-y-3 text-white/80">
              {["Inget åtagande", "Konkret leverans definierad", "Era data, era prioriteringar"].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 text-drake-sky"><Check size={16} /></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {linkedCase && (
            <Link
              to="/case/$slug"
              params={{ slug: linkedCase.slug }}
              preload="intent"
              className="md:col-span-2 block rounded-xl bg-white/5 border border-white/15 backdrop-blur p-7 hover:bg-white/10 hover:border-drake-sky transition-colors group"
            >
              <p className="da-eyebrow text-drake-sky">Kundcase</p>
              <h4 className="da-display text-2xl mt-3 text-white">{linkedCase.client}</h4>
              <p className="text-white/75 mt-2">{linkedCase.title}</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {linkedCase.results.slice(0, 3).map((r, i) => (
                  <div key={i}>
                    <p className="font-display text-2xl text-drake-sky">{r.metric}</p>
                    <p className="text-xs text-white/60 mt-1">{r.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-drake-sky text-xs font-display uppercase tracking-[0.14em]">
                Se caset <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}
        </div>
      </Section>

      {/* Bottom nav */}
      <section className="bg-white py-16 border-t border-drake-rule">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link to="/hub" className="inline-flex items-center gap-2 font-display uppercase tracking-[0.14em] text-sm text-drake-mid hover:text-drake-deep">
            ← Tillbaka till översikten
          </Link>
          <Link
            to="/modul/$slug"
            params={{ slug: next.slug }}
            preload="intent"
            className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-drake-tint-soft border border-drake-tint-strong hover:bg-drake-sky hover:text-white hover:border-drake-sky transition-colors"
          >
            <div>
              <p className="da-eyebrow text-drake-mid group-hover:text-white/80">Nästa modul</p>
              <p className="font-display uppercase tracking-wide mt-1">{next.title}</p>
            </div>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Section({
  eyebrow,
  bg,
  children,
}: {
  eyebrow: string;
  bg: "white" | "tint" | "deep";
  children: React.ReactNode;
}) {
  const bgClass =
    bg === "white" ? "bg-white" : bg === "tint" ? "bg-drake-tint-soft" : "bg-drake-deep text-white";
  return (
    <section className={`print-page py-20 md:py-28 ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`da-eyebrow ${bg === "deep" ? "text-drake-sky" : ""}`}
        >
          {eyebrow}
        </motion.p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
