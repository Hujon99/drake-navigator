import { motion } from "motion/react";
import { BrandLogo } from "./BrandLogo";
import { fadeUp, stagger } from "@/lib/motion";

// Curated, grouped partner stack — keys must match PARTNERS in logo-data.ts
export const PARTNER_GROUPS: { label: string; items: string[] }[] = [
  {
    label: "Data Platforms",
    items: ["snowflake", "microsoft-fabric", "databricks", "google-cloud", "azure"],
  },
  { label: "BI & Analytics", items: ["power-bi", "qlik", "tableau"] },
  {
    label: "AI & Machine Learning",
    items: ["azure-openai", "copilot", "vertex-ai", "cortex", "datarobot", "qlik-predict"],
  },
  { label: "Process Intelligence", items: ["mpmx"] },
  { label: "Planning & Writeback", items: ["aimplan", "planacy", "dataplus"] },
  { label: "Automation & Low Code", items: ["power-platform", "uipath", "power-automate"] },
  { label: "Integration & Catalog", items: ["dbt", "talend", "alteryx", "adf"] },
];

export function PartnerGrid() {
  return (
    <motion.div
      variants={stagger(0.04)}
      initial="initial"
      animate="animate"
      className="grid md:grid-cols-2 gap-x-10 gap-y-10"
    >
      {PARTNER_GROUPS.map((g) => (
        <motion.div key={g.label} variants={fadeUp}>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-drake-sky" />
            <p className="da-eyebrow text-drake-mid">{g.label}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {g.items.map((p) => (
              <div
                key={p}
                className="rounded-lg border border-drake-line bg-white hover:border-drake-sky hover:shadow-[0_4px_20px_-8px_rgba(80,188,189,0.5)] hover:-translate-y-0.5 transition-all"
              >
                <BrandLogo brand={p} kind="partner" tone="color" size="sm" />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
