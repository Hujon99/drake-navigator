import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { coreSlides } from "@/content/core-slides";
import { modules } from "@/content/modules";
import { partnerGroups } from "@/content/partners";
import { NavBar } from "@/components/drake/NavBar";
import { SlideFooterLogo } from "@/components/drake/SlideFooterLogo";
import { Logo } from "@/components/drake/Logo";
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

  const isCover = slide.kind === "cover";

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <NavBar
        crumbs={[{ label: `Kärnsekvens ${n} / ${coreSlides.length}` }]}
        variant={isCover ? "dark" : "light"}
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
            className="rounded-full bg-white/90 backdrop-blur shadow-md border border-drake-line w-11 h-11 inline-flex items-center justify-center hover:bg-drake-sky hover:text-white hover:border-drake-sky transition-colors"
            aria-label="Föregående"
          >
            <ArrowLeft size={18} />
          </Link>
        ) : (
          <span className="w-11 h-11" />
        )}

        <div className="flex items-center gap-2 px-4 h-11 rounded-full bg-white/90 backdrop-blur shadow-md border border-drake-line">
          {coreSlides.map((s) => (
            <Link
              key={s.n}
              to="/slide/$n"
              params={{ n: String(s.n) }}
              className={`h-2 rounded-full transition-all ${s.n === n ? "w-8 bg-drake-sky" : "w-2 bg-drake-line hover:bg-drake-mute"}`}
              aria-label={`Slide ${s.n}`}
            />
          ))}
        </div>

        {n < coreSlides.length ? (
          <Link
            to="/slide/$n"
            params={{ n: String(n + 1) }}
            className="rounded-full bg-drake-sky text-white shadow-md w-11 h-11 inline-flex items-center justify-center hover:bg-drake-deep transition-colors"
            aria-label="Nästa"
          >
            <ArrowRight size={18} />
          </Link>
        ) : (
          <Link
            to="/hub"
            className="rounded-full bg-drake-sky text-white shadow-md h-11 px-5 inline-flex items-center gap-2 font-display uppercase tracking-[0.14em] text-xs hover:bg-drake-deep transition-colors"
          >
            Öppna områdeskartan <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}

/* ---------- Slide 1: Cover ---------- */
function CoverSlide({ slide }: { slide: typeof coreSlides[number] }) {
  return (
    <div
      className="relative w-full min-h-screen flex items-center overflow-hidden da-grain"
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, #168896 0%, #0e5f66 45%, #0a4146 100%)",
      }}
    >
      {/* Animated cloud blobs */}
      <img src={cloud1} alt="" className="da-blob absolute -top-32 -left-32 w-[60vw] opacity-30 mix-blend-screen pointer-events-none" />
      <img src={cloud3} alt="" className="da-blob absolute -bottom-40 -right-40 w-[55vw] opacity-25 mix-blend-screen pointer-events-none" style={{ animationDelay: "-6s" }} />

      <motion.div
        variants={stagger(0.08)}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 text-white"
      >
        <motion.p variants={fadeUp} className="da-eyebrow text-drake-sky">
          {slide.eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="da-display mt-6 text-[clamp(48px,9vw,128px)] leading-[0.95] text-white"
        >
          From <span className="text-drake-sky">Insight</span><br />to Action.
        </motion.h1>
        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
          <span className="da-rule" />
          <p className="text-white/80 max-w-xl text-lg font-light leading-relaxed">{slide.body}</p>
        </motion.div>
      </motion.div>

      <SlideFooterLogo variant="light" />
    </div>
  );
}

/* ---------- Slide 2: Who we are ---------- */
function WhoSlide({ slide }: { slide: typeof coreSlides[number] }) {
  const stats = [
    { n: "2014", l: "Grundat" },
    { n: "~50", l: "Specialister" },
    { n: "4", l: "Kontor i Sverige" },
    { n: "100%", l: "Oberoende" },
  ];
  const roles = ["Data Engineers", "Data Scientists / AI Engineers", "BI Consultants", "Business Consultants", "Solution Architects", "Low Code & Automation Engineers"];

  return (
    <div className="w-full min-h-screen grid md:grid-cols-2 gap-0">
      <motion.div variants={stagger()} initial="initial" animate="animate" className="px-8 md:px-16 py-32 flex flex-col justify-center bg-white">
        <motion.p variants={fadeUp} className="da-eyebrow">{slide.eyebrow}</motion.p>
        <motion.h2 variants={fadeUp} className="da-display mt-5 text-[clamp(32px,5vw,64px)] max-w-xl">
          Oberoende experter på <span className="text-drake-sky">data, AI & analys</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="da-ingress mt-6 max-w-lg">{slide.body}</motion.p>

        <motion.div variants={fadeUp} className="mt-10 grid grid-cols-2 gap-6 max-w-md">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="font-display text-4xl text-drake-deep">{s.n}</p>
              <p className="da-eyebrow mt-2 text-drake-mid">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative bg-drake-tint-soft overflow-hidden flex items-center justify-center p-8">
        <img src={nordics} alt="Drake Analytics i Norden" className="max-w-[80%] max-h-[60vh] object-contain" />
        <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur rounded-lg p-5 border border-drake-line shadow-sm">
          <p className="da-eyebrow mb-3">Roller</p>
          <div className="flex flex-wrap gap-2">
            {roles.map((r) => (
              <span key={r} className="text-xs px-3 py-1.5 rounded-full bg-white border border-drake-line text-drake-mid">{r}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Slide 3: Value chain ---------- */
function ChainSlide({ slide }: { slide: typeof coreSlides[number] }) {
  const steps = [
    { label: "Datakällor", sub: "ERP · CRM · WMS · SaaS · IoT" },
    { label: "Plattform", sub: "Lakehouse · ELT · Governance" },
    { label: "Trusted data", sub: "Modeller · Kvalitet · Lineage" },
    { label: "Värde", sub: "BI · AI · Planning · Agenter" },
  ];
  return (
    <div className="w-full min-h-screen flex flex-col justify-center px-8 md:px-16 py-32 bg-white">
      <motion.div variants={stagger()} initial="initial" animate="animate" className="max-w-6xl mx-auto w-full">
        <motion.p variants={fadeUp} className="da-eyebrow">{slide.eyebrow}</motion.p>
        <motion.h2 variants={fadeUp} className="da-display mt-5 text-[clamp(32px,4.5vw,56px)] max-w-3xl">
          Vi täcker hela kedjan — från källa till handling
        </motion.h2>
        <motion.p variants={fadeUp} className="da-ingress mt-6 max-w-2xl">{slide.body}</motion.p>

        <motion.div variants={fadeUp} className="mt-16 relative">
          <div className="hidden md:block absolute top-12 left-[6%] right-[6%] h-px bg-drake-line" />
          <div className="grid md:grid-cols-4 gap-6 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="bg-white rounded-xl border border-drake-line p-6 hover:border-drake-sky hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-drake-sky text-white flex items-center justify-center font-display text-lg mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="font-display uppercase tracking-wide text-drake-ink text-lg">{s.label}</p>
                <p className="mt-2 text-sm text-drake-mid">{s.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-10 grid md:grid-cols-3 gap-3">
            {["Automation", "Agentic AI", "Process Intelligence"].map((t) => (
              <div key={t} className="px-4 py-3 rounded-lg bg-drake-tint-soft border border-drake-tint-strong text-drake-deep font-display uppercase tracking-wide text-sm">
                {t}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <SlideFooterLogo />
    </div>
  );
}

/* ---------- Slide 4: Partners ---------- */
function PartnersSlide({ slide }: { slide: typeof coreSlides[number] }) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center px-8 md:px-16 py-32 bg-white">
      <motion.div variants={stagger(0.04)} initial="initial" animate="animate" className="max-w-6xl mx-auto w-full">
        <motion.p variants={fadeUp} className="da-eyebrow">{slide.eyebrow}</motion.p>
        <motion.h2 variants={fadeUp} className="da-display mt-5 text-[clamp(32px,4.5vw,56px)] max-w-3xl">
          Vi väljer <span className="text-drake-sky">rätt</span> verktyg — inte favoritverktyg
        </motion.h2>
        <motion.p variants={fadeUp} className="da-ingress mt-6 max-w-2xl">{slide.body}</motion.p>

        <motion.div variants={fadeUp} className="mt-12 grid md:grid-cols-2 gap-x-10 gap-y-8">
          {partnerGroups.map((g) => (
            <motion.div key={g.label} variants={fadeUp}>
              <p className="da-eyebrow text-drake-mid">{g.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-md border border-drake-line bg-white text-sm hover:border-drake-sky hover:text-drake-deep transition-colors">{p}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <SlideFooterLogo />
    </div>
  );
}

/* ---------- Slide 5: Dialog ---------- */
function DialogSlide({ slide }: { slide: typeof coreSlides[number] }) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-drake-closing text-white overflow-hidden da-grain">
      <img src={dataHuman} alt="" className="absolute right-0 bottom-0 max-h-[90vh] opacity-15 pointer-events-none" />
      <motion.div variants={stagger()} initial="initial" animate="animate" className="relative z-10 max-w-5xl px-8 md:px-16">
        <motion.p variants={fadeUp} className="da-eyebrow text-drake-sky">{slide.eyebrow}</motion.p>
        <motion.h2 variants={fadeUp} className="da-display mt-6 text-[clamp(40px,6vw,88px)] text-white leading-[1.02]">
          Var är ni idag?<br />
          <span className="text-drake-sky">Vad är mest relevant för er?</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-8 text-lg text-white/80 max-w-2xl font-light leading-relaxed">{slide.body}</motion.p>

        <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-3">
          {modules.map((m) => (
            <Link
              key={m.slug}
              to="/modul/$slug"
              params={{ slug: m.slug }}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-drake-sky border border-white/20 hover:border-drake-sky text-sm font-display uppercase tracking-[0.1em] transition-colors backdrop-blur"
            >
              {m.title}
            </Link>
          ))}
        </motion.div>
      </motion.div>
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 opacity-90">
        <Logo variant="light" className="h-6" />
      </div>
    </div>
  );
}
