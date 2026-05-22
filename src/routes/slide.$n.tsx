import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { coreSlides } from "@/content/core-slides";
import { NavBar } from "@/components/drake/NavBar";
import { CoverSlide, WhoSlide, ChainSlide, PartnersSlide, DialogSlide } from "@/components/drake/CoreSlides";
import { slideVariants } from "@/lib/motion";


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

export { CoverSlide, WhoSlide, ChainSlide, PartnersSlide, DialogSlide } from "@/components/drake/CoreSlides";

