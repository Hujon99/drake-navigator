import { motion } from "motion/react";
import { BrandLogo } from "./BrandLogo";
import { CUSTOMERS } from "@/lib/logo-data";
import { fadeUp } from "@/lib/motion";

const DEFAULT_CUSTOMERS = [
  "atlascopco",
  "siemens-energy",
  "alfa-laval",
  "scania",
  "swedbank",
  "postnord",
  "migrationsverket",
  "skatteverket",
];

interface LogoStripProps {
  brands?: string[];
  eyebrow?: string;
  className?: string;
}

export function LogoStrip({
  brands = DEFAULT_CUSTOMERS,
  eyebrow = "Bland våra kunder",
  className = "",
}: LogoStripProps) {
  return (
    <motion.div variants={fadeUp} className={className}>
      <p className="da-eyebrow text-drake-mid mb-5">{eyebrow}</p>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {brands.map((b) => {
          const meta = CUSTOMERS[b];
          if (!meta) return null;
          return (
            <div
              key={b}
              className="group transition-all duration-300 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:-translate-y-0.5"
              title={meta.name}
            >
              <BrandLogo brand={b} kind="customer" tone="color" size="md" />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
