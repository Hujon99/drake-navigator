import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { moduleBySlug, modules } from "@/content/modules";
import type { ModuleContent } from "@/content/types";
import { NavBar } from "@/components/drake/NavBar";
import { ModuleBody } from "@/components/drake/ModuleBody";
import { useLenis } from "@/lib/use-lenis";


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
  const { module: m } = Route.useLoaderData() as { module: ModuleContent };
  useLenis(true);

  const idx = modules.findIndex((x) => x.slug === m.slug);
  const next = modules[(idx + 1) % modules.length];

  return (
    <div className="min-h-screen bg-white">
      <NavBar crumbs={[{ label: "Modul", to: "/hub" }, { label: m.title }]} variant="dark" />
      <ModuleBody module={m} />
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
