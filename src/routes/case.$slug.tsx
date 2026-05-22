import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseBySlug } from "@/content/cases";
import { moduleBySlug } from "@/content/modules";
import type { CaseContent, ModuleSlug } from "@/content/types";
import { NavBar } from "@/components/drake/NavBar";
import { CaseBody } from "@/components/drake/CaseBody";
import { useLenis } from "@/lib/use-lenis";


export const Route = createFileRoute("/case/$slug")({
  component: CasePage,
  loader: ({ params }) => {
    const c = caseBySlug(params.slug);
    if (!c) throw notFound();
    return { case: c };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.case.client ?? "Kundcase"} — Drake Analytics` }],
  }),
});

function CasePage() {
  const { case: c } = Route.useLoaderData() as { case: CaseContent };
  useLenis(true);
  const linkedModules = c.modules.map((s: ModuleSlug) => moduleBySlug(s)!).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <NavBar crumbs={[{ label: "Kundcase", to: "/hub" }, { label: c.client }]} variant="dark" />
      <CaseBody case={c} />
      {/* Bottom nav */}
      <section className="bg-white py-16 border-t border-drake-rule">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link to="/hub" className="inline-flex items-center gap-2 font-display uppercase tracking-[0.14em] text-sm text-drake-mid hover:text-drake-deep">
            <ArrowLeft size={16} /> Tillbaka till översikten
          </Link>
          {linkedModules[0] && (
            <Link
              to="/modul/$slug"
              params={{ slug: linkedModules[0].slug }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-drake-sky text-white hover:bg-drake-deep transition-colors font-display uppercase tracking-wide text-sm"
            >
              Till modulen: {linkedModules[0].title} <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

