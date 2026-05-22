import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Database, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { coreSlides } from "@/content/core-slides";
import { modules } from "@/content/modules";
import { NavBar } from "@/components/drake/NavBar";
import { SlideFooterLogo } from "@/components/drake/SlideFooterLogo";
import { Logo } from "@/components/drake/Logo";
import { LogoStrip } from "@/components/drake/LogoStrip";
import { PartnerGrid } from "@/components/drake/PartnerGrid";
import { slideVariants, fadeUp, stagger } from "@/lib/motion";

import cloud1 from "@/assets/drake/cloud-1.png";
import cloud3 from "@/assets/drake/cloud-3.jpg";
import nordics from "@/assets/drake/nordics-map.png";
import dataHuman from "@/assets/drake/data-human.png";

export const Route = createFileRoute("/slide/$n")({
  component: SlidePage,
  loader: ({ params }) => {
    const n = Number(params.n);
    if (!Number.isInteger(n) || n < 1 || n > coreSlides.length) throw notFound();
    return { n };
  },
});

function SlidePage() {
  const { n } = Route.useLoaderData();
  const navigate = useNavigate();
  const slide = coreSlides[n - 1];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (n < coreSlides.length) navigate({ to: "/slide/$n", params: { n: String(n + 1) } });
        else navigate({ to: "/hub" });
      } else if (e.key === "ArrowLeft" && n > 1) {
        navigate({ to: "/slide/$n", params: { n: String(n - 1) } });
      } else if (e.key === "Escape") {
        navigate({ to: "/hub" });
      } else if (e.key.toLowerCase() === "p") {
        window.print();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, navigate]);

  const darkSlides = ["cover", "dialog"];
  const isDark = darkSlides.includes(slide.kind);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <NavBar
        crumbs={[{ label: `Kärnsekvens ${n} / ${coreSlides.length}` }]}
        variant={isDark ? "dark" : "light"}
      />

      <AnimatePresence mode="wait">
        <motion.section
          key={slide.slug}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="print-page min-h-screen flex items-center justify-center relative"
        >
          {slide.kind === "cover" && <CoverSlide slide={slide} />}
          {slide.kind === "who" && <WhoSlide slide={slide} />}
          {slide.kind === "chain" && <ChainSlide slide={slide} />}
          {slide.kind === "partners" && <PartnersSlide slide={slide} />}
          {slide.kind === "dialog" && <DialogSlide slide={slide} />}
        </motion.section>
      </AnimatePresence>

      {/* Bottom nav */}
      <div data-no-print className="no-print fixed bottom-6 inset-x-0 z-40 flex items-center justify-center gap-4">
        {n > 1 ? (
          <Link
            to="/slide/$n"
            params={{ n: String(n - 1) }}
            className="rounded-full bg-white/95 backdrop-blur shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] border border-drake-line w-11 h-11 inline-flex items-center justify-center hover:bg-drake-sky hover:text-white hover:border-drake-sky transition-colors"
            aria-label="Föregående slide"
          >
            <ArrowLeft size={18} />
          </Link>
        ) : (
          <span className="w-11 h-11" />
        )}

        <div className="flex items-center gap-2 px-4 h-11 rounded-full bg-white/95 backdrop-blur shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] border border-drake-line">
          {coreSlides.map((s) => (
            <Link
              key={s.n}
              to="/slide/$n"
              params={{ n: String(s.n) }}
              className={`h-2 rounded-full transition-all ${s.n === n ? "w-8 bg-drake-sky" : "w-2 bg-drake-line hover:bg-drake-mute"}`}
              aria-label={`Gå till slide ${s.n}`}
            />
          ))}
        </div>

        {n < coreSlides.length ? (
          <Link
            to="/slide/$n"
            params={{ n: String(n + 1) }}
            className="rounded-full bg-drake-deep text-white shadow-[0_10px_30px_-10px_rgba(14,95,102,0.6)] w-11 h-11 inline-flex items-center justify-center hover:bg-drake-ground transition-colors"
            aria-label="Nästa slide"
          >
            <ArrowRight size={18} />
          </Link>
        ) : (
          <Link
            to="/hub"
            className="rounded-full bg-drake-deep text-white shadow-[0_10px_30px_-10px_rgba(14,95,102,0.6)] h-11 px-5 inline-flex items-center gap-2 font-display uppercase tracking-[0.14em] text-xs hover:bg-drake-ground transition-colors"
          >
            Öppna områdeskartan <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}

/* ───────────────── Slide 1: Cover ───────────────── */
function CoverSlide({ slide }: { slide: typeof coreSlides[number] }) {
  return (
    <div
      className="relative w-full min-h-screen flex items-center overflow-hidden da-grain da-vignette"
      style={{
        background:
          "radial-gradient(ellipse at 25% 15%, #1a9aa7 0%, #168896 30%, #0e5f66 55%, #062f33 100%)",
      }}
    >
      {/* Soft animated clouds */}
      <img src={cloud1} alt="" aria-hidden className="da-blob absolute -top-40 -left-40 w-[65vw] opacity-25 mix-blend-screen pointer-events-none" />
      <img src={cloud3} alt="" aria-hidden className="da-blob absolute -bottom-48 -right-48 w-[55vw] opacity-20 mix-blend-screen pointer-events-none" style={{ animationDelay: "-6s" }} />

      {/* Decorative grid lines */}
      <svg aria-hidden className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Hairline accent on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-drake-sky to-transparent opacity-50" />

      <motion.div
        variants={stagger(0.1)}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 text-white w-full"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
          <span className="h-px w-12 bg-drake-sky" />
          <p className="da-eyebrow text-drake-sky">{slide.eyebrow} · Sedan 2014</p>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="da-display text-[clamp(56px,11vw,180px)] leading-[0.88] text-white tracking-tight"
        >
          From
          <br />
          <span className="da-gradient-text">Insight</span>
          <br />
          to Action.
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-12 grid md:grid-cols-[1fr_auto] gap-10 items-end max-w-5xl">
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            {slide.body}
          </p>
          <div className="flex gap-8 text-white/70">
            {[
              { n: "50+", l: "Specialister" },
              { n: "10+", l: "År av leveranser" },
              { n: "100%", l: "Oberoende" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl text-drake-sky">{s.n}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] mt-1 text-white/60">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle "press →" hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-20 right-10 text-white/50 text-[11px] font-display uppercase tracking-[0.2em] hidden md:flex items-center gap-2"
      >
        Tryck <span className="px-2 py-0.5 border border-white/30 rounded">→</span> för att börja
      </motion.div>

      <SlideFooterLogo variant="light" />
    </div>
  );
}

/* ───────────────── Slide 2: Who we are ───────────────── */
function WhoSlide({ slide }: { slide: typeof coreSlides[number] }) {
  const stats = [
    { n: "2014", l: "Grundat" },
    { n: "~50", l: "Specialister" },
    { n: "4", l: "Kontor" },
    { n: "100%", l: "Oberoende" },
  ];
  const roles = [
    "Data Engineers",
    "Data Scientists",
    "AI Engineers",
    "BI Consultants",
    "Business Consultants",
    "Solution Architects",
    "Low Code Engineers",
  ];
  const cities = [
    { name: "Stockholm", top: "44%", left: "55%" },
    { name: "Göteborg", top: "60%", left: "38%" },
    { name: "Linköping", top: "55%", left: "52%" },
    { name: "Jönköping", top: "60%", left: "48%" },
  ];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="flex-1 grid md:grid-cols-[1.05fr_0.95fr] gap-0">
        {/* Left */}
        <motion.div variants={stagger(0.07)} initial="initial" animate="animate" className="px-8 md:px-16 py-28 flex flex-col justify-center">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-drake-sky" />
            <p className="da-eyebrow">{slide.eyebrow}</p>
          </motion.div>
          <motion.h2 variants={fadeUp} className="da-display text-[clamp(34px,5vw,68px)] max-w-xl">
            Oberoende experter på <span className="da-gradient-text">data, AI & analys</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="da-ingress mt-6 max-w-lg">{slide.body}</motion.p>

          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-4 gap-5 max-w-xl">
            {stats.map((s) => (
              <div key={s.l} className="border-t border-drake-sky pt-3">
                <p className="font-display text-3xl md:text-4xl text-drake-deep">{s.n}</p>
                <p className="da-eyebrow mt-2 text-drake-mid text-[10px]">{s.l}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <p className="da-eyebrow text-drake-mid mb-3">Våra roller</p>
            <div className="flex flex-wrap gap-1.5">
              {roles.map((r) => (
                <span key={r} className="text-xs px-3 py-1.5 rounded-full bg-drake-tint-soft border border-drake-tint-strong text-drake-deep">{r}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: map with pulsing dots */}
        <div className="relative bg-drake-tint-soft overflow-hidden flex items-center justify-center p-12 border-l border-drake-rule">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-drake-sky/20 to-transparent" />
          <div className="relative w-full max-w-md">
            <img src={nordics} alt="Drake Analytics kontor i Norden" className="w-full object-contain" />
            {cities.map((c) => (
              <div key={c.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: c.top, left: c.left }}>
                <div className="relative w-3 h-3">
                  <span className="da-pulse-ring" aria-hidden />
                  <span className="absolute inset-0 rounded-full bg-drake-deep ring-2 ring-white" />
                </div>
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[11px] font-display uppercase tracking-wide text-drake-deep whitespace-nowrap">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer logo strip */}
      <div className="border-t border-drake-rule bg-white px-8 md:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <LogoStrip eyebrow="Vi har levererat till bl.a." />
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Slide 3: Value chain ───────────────── */
function ChainSlide({ slide }: { slide: typeof coreSlides[number] }) {
  const steps = [
    { label: "Datakällor", sub: "ERP · CRM · WMS · SaaS · IoT", icon: Database },
    { label: "Plattform", sub: "Lakehouse · ELT · Governance", icon: Layers },
    { label: "Trusted data", sub: "Modeller · Kvalitet · Lineage", icon: ShieldCheck },
    { label: "Värde", sub: "BI · AI · Planning · Agenter", icon: Sparkles },
  ];
  return (
    <div className="w-full min-h-screen flex flex-col justify-center px-8 md:px-16 py-28 bg-white">
      <motion.div variants={stagger(0.07)} initial="initial" animate="animate" className="max-w-7xl mx-auto w-full">
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
          <span className="h-px w-10 bg-drake-sky" />
          <p className="da-eyebrow">{slide.eyebrow}</p>
        </motion.div>
        <motion.h2 variants={fadeUp} className="da-display text-[clamp(32px,4.6vw,60px)] max-w-4xl">
          Vi täcker hela kedjan —<br />
          <span className="da-gradient-text">från källa till handling</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="da-ingress mt-6 max-w-2xl">{slide.body}</motion.p>

        {/* Flow */}
        <motion.div variants={fadeUp} className="mt-20 relative">
          {/* Animated connector line */}
          <svg
            aria-hidden
            className="hidden md:block absolute top-10 left-[10%] right-[10%] h-1"
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
            style={{ width: "80%" }}
          >
            <line x1="0" y1="2" x2="1000" y2="2" stroke="var(--da-drake-sky)" strokeWidth="2" className="da-flow-line" />
          </svg>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="group bg-white rounded-2xl border border-drake-line p-7 hover:border-drake-sky hover:shadow-[0_20px_50px_-25px_rgba(80,188,189,0.5)] hover:-translate-y-1 transition-all relative"
                >
                  <div className="relative w-14 h-14 rounded-full bg-white border-2 border-drake-sky flex items-center justify-center mb-5 mx-auto md:mx-0 group-hover:bg-drake-sky transition-colors">
                    <Icon size={22} className="text-drake-deep group-hover:text-white transition-colors" />
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-drake-deep text-white text-[10px] font-display flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-display uppercase tracking-wide text-drake-ink text-lg">{s.label}</p>
                  <p className="mt-2 text-sm text-drake-mid leading-relaxed">{s.sub}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Cross-cutting layers */}
          <motion.div variants={fadeUp} className="mt-10">
            <p className="da-eyebrow text-drake-mid mb-3">Genomgående lager</p>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { t: "Automation", d: "Reducerar manuellt arbete i flödet" },
                { t: "Agentic AI", d: "Beslutsstöd och autonom handling" },
                { t: "Process Intelligence", d: "Synliggör hur processerna faktiskt går" },
              ].map((t) => (
                <div key={t.t} className="px-5 py-4 rounded-xl bg-gradient-to-br from-drake-tint-soft to-white border border-drake-tint-strong">
                  <p className="font-display uppercase tracking-wide text-sm text-drake-deep">{t.t}</p>
                  <p className="text-xs text-drake-mid mt-1">{t.d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <SlideFooterLogo />
    </div>
  );
}

/* ───────────────── Slide 4: Partners ───────────────── */
function PartnersSlide({ slide }: { slide: typeof coreSlides[number] }) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center px-8 md:px-16 py-28 bg-white">
      <motion.div variants={stagger(0.04)} initial="initial" animate="animate" className="max-w-7xl mx-auto w-full">
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
          <span className="h-px w-10 bg-drake-sky" />
          <p className="da-eyebrow">{slide.eyebrow}</p>
        </motion.div>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <motion.div variants={fadeUp}>
            <h2 className="da-display text-[clamp(32px,4.6vw,60px)] max-w-2xl">
              Vi väljer <span className="da-gradient-text">rätt</span> verktyg<br />— inte favoritverktyg
            </h2>
            <p className="da-ingress mt-6 max-w-xl">{slide.body}</p>

            <div className="mt-10 grid grid-cols-3 gap-5 max-w-md">
              {[
                { n: "5", l: "Partnerprogram" },
                { n: "20+", l: "Plattformar" },
                { n: "100%", l: "Oberoende" },
              ].map((s) => (
                <div key={s.l} className="border-t border-drake-sky pt-3">
                  <p className="font-display text-3xl text-drake-deep">{s.n}</p>
                  <p className="da-eyebrow mt-2 text-drake-mid text-[10px]">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="md:max-h-[70vh] md:overflow-auto md:pr-2">
            <PartnerGrid />
          </div>
        </div>
      </motion.div>
      <SlideFooterLogo />
    </div>
  );
}

/* ───────────────── Slide 5: Dialog ───────────────── */
function DialogSlide({ slide }: { slide: typeof coreSlides[number] }) {
  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden da-grain"
      style={{
        background:
          "linear-gradient(135deg, #0e5f66 0%, #0a4146 50%, #062f33 100%)",
      }}
    >
      <img src={dataHuman} alt="" aria-hidden className="absolute right-0 bottom-0 max-h-[85vh] opacity-20 pointer-events-none mix-blend-screen" />
      <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] rounded-full bg-drake-sky/15 blur-3xl pointer-events-none" />

      <motion.div variants={stagger(0.08)} initial="initial" animate="animate" className="relative z-10 max-w-6xl px-8 md:px-16 w-full">
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-drake-sky" />
          <p className="da-eyebrow text-drake-sky">{slide.eyebrow}</p>
        </motion.div>

        <motion.h2 variants={fadeUp} className="da-display text-[clamp(40px,6.5vw,96px)] text-white leading-[1.0]">
          Var är ni idag?<br />
          <span className="da-gradient-text">Vad är mest relevant för er?</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-8 text-lg md:text-xl text-white/85 max-w-2xl font-light leading-relaxed">{slide.body}</motion.p>

        {/* Module cards as launchpad */}
        <motion.div variants={fadeUp} className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3">
          {modules.map((m) => (
            <Link
              key={m.slug}
              to="/modul/$slug"
              params={{ slug: m.slug }}
              preload="intent"
              className="group relative rounded-xl p-5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-drake-sky transition-all backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-drake-sky/0 to-drake-sky/0 group-hover:from-drake-sky/15 group-hover:to-transparent transition-opacity" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <span className="font-display text-drake-sky text-lg">{m.number}</span>
                  <p className="font-display uppercase tracking-wide text-sm md:text-base text-white mt-2">{m.title}</p>
                </div>
                <ArrowRight size={16} className="text-white/40 group-hover:text-drake-sky group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-10 text-[11px] font-display uppercase tracking-[0.2em] text-white/50"
        >
          Tryck <span className="px-2 py-0.5 border border-white/30 rounded mx-1">Esc</span> eller klicka på ett område för att öppna områdeskartan
        </motion.p>
      </motion.div>

      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 opacity-90">
        <Logo variant="light" className="h-6" />
      </div>
    </div>
  );
}
