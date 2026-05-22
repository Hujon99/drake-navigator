import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { ArrowLeft, LayoutGrid, Printer } from "lucide-react";
import { Logo } from "./Logo";

interface Crumb {
  label: string;
  to?: string;
}

export function NavBar({
  crumbs = [],
  variant = "light",
}: {
  crumbs?: Crumb[];
  variant?: "light" | "dark";
}) {
  const router = useRouter();
  const location = useLocation();
  const isHub = location.pathname === "/hub";
  const onLight = variant === "light";

  return (
    <header
      data-no-print
      className={`no-print fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-colors ${
        onLight ? "text-drake-ink" : "text-white"
      }`}
      style={{
        backdropFilter: "blur(8px)",
        background: onLight ? "rgba(255,255,255,0.72)" : "rgba(14, 95, 102, 0.42)",
        borderBottom: onLight ? "1px solid var(--da-light-gray-2)" : "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div className="flex items-center gap-4 min-w-0">
        {!isHub && (
          <Link
            to="/hub"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-display hover:text-drake-sky transition-colors"
          >
            <ArrowLeft size={14} />
            Tillbaka till översikt
          </Link>
        )}
        {isHub && (
          <button
            onClick={() => router.history.back()}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-display hover:text-drake-sky transition-colors"
          >
            <ArrowLeft size={14} />
            Tillbaka
          </button>
        )}
        <div className="hidden md:flex items-center gap-2 text-xs font-display uppercase tracking-[0.14em] opacity-80 truncate">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2 truncate">
              <span className="opacity-50">/</span>
              {c.to ? (
                <Link to={c.to} className="hover:text-drake-sky transition-colors truncate">{c.label}</Link>
              ) : (
                <span className="truncate">{c.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/hub"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-display px-3 py-2 rounded-md hover:bg-drake-tint-soft hover:text-drake-deep transition-colors"
          aria-label="Områdeskarta"
        >
          <LayoutGrid size={14} /> Hub
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-display px-3 py-2 rounded-md hover:bg-drake-tint-soft hover:text-drake-deep transition-colors"
        >
          <Printer size={14} /> PDF
        </button>
        <Logo variant={onLight ? "dark" : "light"} className="h-6" />
      </div>
    </header>
  );
}
