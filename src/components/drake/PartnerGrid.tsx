import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

interface Tool {
  name: string;
  color: string;
}

// Categories and tools mirror Drake's "Products and Partnerships" sales slide.
export const PARTNER_GROUPS: { label: string; items: Tool[] }[] = [
  {
    label: "Data Platforms",
    items: [
      { name: "Google Cloud", color: "#4285F4" },
      { name: "Databricks", color: "#FF3621" },
      { name: "Snowflake", color: "#29B5E8" },
      { name: "Microsoft Azure / Fabric", color: "#0078D4" },
    ],
  },
  {
    label: "BI Platforms",
    items: [
      { name: "Qlik", color: "#009848" },
      { name: "Power BI", color: "#F2C811" },
      { name: "Tableau", color: "#E97627" },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { name: "Google Vertex", color: "#4285F4" },
      { name: "Snowflake Cortex AI", color: "#29B5E8" },
      { name: "Azure AI Foundry & Azure ML", color: "#0078D4" },
      { name: "Copilot Studio", color: "#0078D4" },
    ],
  },
  {
    label: "Auto AI / ML",
    items: [
      { name: "DataRobot", color: "#2D9CDB" },
      { name: "Qlik Predict", color: "#009848" },
    ],
  },
  {
    label: "Process Mining",
    items: [{ name: "mpmX", color: "#0066CC" }],
  },
  {
    label: "Forecast, Budget & Planning",
    items: [
      { name: "Dataplus", color: "#5D3FD3" },
      { name: "Planacy", color: "#FF6B35" },
      { name: "Aimplan", color: "#1E88E5" },
    ],
  },
  {
    label: "RPA",
    items: [
      { name: "UiPath", color: "#FA4616" },
      { name: "Power Automate", color: "#0066FF" },
    ],
  },
  {
    label: "Data Integration (ELT / ETL / CDC)",
    items: [
      { name: "Qlik Talend", color: "#FF6D00" },
      { name: "dbt", color: "#FF694A" },
      { name: "Alteryx", color: "#0070C0" },
      { name: "Azure Data Factory", color: "#0078D4" },
    ],
  },
  {
    label: "Data Catalogs",
    items: [
      { name: "Talend", color: "#FF6D00" },
      { name: "Azure Data Catalog", color: "#0078D4" },
    ],
  },
  {
    label: "Low Code Solutions",
    items: [
      { name: "Power Apps", color: "#742774" },
      { name: "Power Automate", color: "#0066FF" },
    ],
  },
];

export function PartnerGrid() {
  return (
    <motion.div
      variants={stagger(0.03)}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"
    >
      {PARTNER_GROUPS.map((g) => (
        <motion.div key={g.label} variants={fadeUp}>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-drake-sky" />
            <p className="da-eyebrow text-drake-mid text-[10px]">{g.label}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((t) => (
              <span
                key={t.name}
                className="inline-flex items-center gap-1.5 rounded-md border border-drake-line bg-white px-2 py-1 text-[11px] font-medium text-drake-ink hover:border-drake-sky hover:shadow-[0_4px_16px_-8px_rgba(80,188,189,0.45)] hover:-translate-y-0.5 transition-all"
              >
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: t.color, boxShadow: `0 0 0 2px ${t.color}1f` }}
                />
                {t.name}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
