import { CUSTOMERS, PARTNERS, getPartnerSvg, type BrandMeta } from "@/lib/logo-data";

interface BrandLogoProps {
  /** Lookup key in CUSTOMERS or PARTNERS */
  brand: string;
  kind: "customer" | "partner";
  /** Visual style: full color logo, grayscale (with hover → color), or mono on dark */
  tone?: "color" | "grayscale" | "mono-dark";
  /** Visual size hint */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { box: "h-9 px-3", text: "text-[13px]", svg: "h-6" },
  md: { box: "h-12 px-4", text: "text-[15px]", svg: "h-8" },
  lg: { box: "h-16 px-5", text: "text-lg", svg: "h-10" },
};

export function BrandLogo({ brand, kind, tone = "color", size = "md", className = "" }: BrandLogoProps) {
  const meta: BrandMeta | undefined = (kind === "customer" ? CUSTOMERS : PARTNERS)[brand];
  if (!meta) return null;

  const svgUrl = kind === "partner" ? getPartnerSvg(brand) : undefined;
  const sz = sizeMap[size];

  // Text chip wrapper styles
  const baseBox = `inline-flex items-center justify-center font-display tracking-wide select-none ${sz.box} ${sz.text} ${className}`;

  if (svgUrl) {
    // Use mask trick so SVG can take any color (simple-icons SVGs are single-color).
    const colorClass =
      tone === "grayscale"
        ? "bg-drake-mid group-hover:bg-current"
        : tone === "mono-dark"
        ? "bg-white/90"
        : "";
    if (tone === "color") {
      return (
        <span className={`${baseBox}`} style={{ color: meta.color }}>
          <img
            src={svgUrl}
            alt={meta.name}
            className={`${sz.svg} w-auto object-contain`}
            draggable={false}
            loading="lazy"
          />
        </span>
      );
    }
    return (
      <span className={`${baseBox} group`} style={tone === "grayscale" ? { color: meta.color } : undefined}>
        <span
          aria-label={meta.name}
          role="img"
          className={`${sz.svg} w-auto inline-block transition-colors ${colorClass}`}
          style={{
            maskImage: `url(${svgUrl})`,
            WebkitMaskImage: `url(${svgUrl})`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            width: "3rem",
          }}
        />
      </span>
    );
  }

  // No SVG → typographic chip using brand color.
  const upper = meta.upper ?? true;
  const colorStyle =
    tone === "color"
      ? { color: meta.color }
      : tone === "mono-dark"
      ? { color: "rgba(255,255,255,0.92)" }
      : { color: "var(--da-mid-gray-2)" };

  return (
    <span
      className={`${baseBox} font-semibold ${upper ? "uppercase" : ""} ${tone === "grayscale" ? "group-hover:!text-current" : ""}`}
      style={{ ...colorStyle, letterSpacing: upper ? "0.04em" : "-0.01em" }}
      aria-label={meta.name}
    >
      {meta.name}
    </span>
  );
}
