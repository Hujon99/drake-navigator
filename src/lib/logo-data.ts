// Brand color + display name for both real-logo and text-fallback rendering.
// When no SVG file exists in src/assets/drake/logos/, we render a typographic
// "logo chip" in the brand color — looks intentional, not placeholder-y.

export type BrandKind = "customer" | "partner";

export interface BrandMeta {
  /** Display name on text fallback */
  name: string;
  /** Primary brand color (hex) */
  color: string;
  /** Optional second color for gradient chips */
  color2?: string;
  /** Optional override for the logo letter-spacing/transform on text chip */
  font?: "display" | "sans" | "serif";
  /** Optional uppercase override */
  upper?: boolean;
}

// Swedish customer brands — used in slide 2 LogoStrip
export const CUSTOMERS: Record<string, BrandMeta> = {
  atlascopco: { name: "Atlas Copco", color: "#1D4F91", font: "sans", upper: false },
  "siemens-energy": { name: "Siemens Energy", color: "#009999", font: "sans", upper: false },
  alfalaval: { name: "Alfa Laval", color: "#003B71", font: "sans", upper: false },
  scania: { name: "Scania", color: "#041E42", font: "sans", upper: false },
  swedbank: { name: "Swedbank", color: "#FF5F00", font: "sans", upper: false },
  postnord: { name: "PostNord", color: "#005CA9", font: "sans", upper: false },
  migrationsverket: { name: "Migrationsverket", color: "#005AA0", font: "sans", upper: false },
  skatteverket: { name: "Skatteverket", color: "#1F3864", font: "sans", upper: false },
};

// Vite eager-glob real SVG files for customer brands
const customerSvgs = import.meta.glob("../assets/drake/logos/customers/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function getCustomerSvg(key: string): string | undefined {
  const match = Object.entries(customerSvgs).find(([path]) =>
    path.toLowerCase().endsWith(`/${key}.svg`)
  );
  return match?.[1];
}


// Partner / tech brands — used in slide 4 PartnerGrid
export const PARTNERS: Record<string, BrandMeta> = {
  // Data Platforms
  snowflake: { name: "Snowflake", color: "#29B5E8" },
  "microsoft-fabric": { name: "Microsoft Fabric", color: "#0078D4" },
  databricks: { name: "Databricks", color: "#FF3621" },
  "google-cloud": { name: "Google Cloud", color: "#4285F4" },
  azure: { name: "Microsoft Azure", color: "#0078D4" },

  // BI
  "power-bi": { name: "Power BI", color: "#F2C811", color2: "#E8A33D" },
  qlik: { name: "Qlik", color: "#009848" },
  tableau: { name: "Tableau", color: "#E97627" },

  // AI
  "azure-openai": { name: "Azure OpenAI", color: "#10A37F" },
  copilot: { name: "Copilot Studio", color: "#0078D4" },
  "vertex-ai": { name: "Vertex AI", color: "#4285F4" },
  cortex: { name: "Snowflake Cortex", color: "#29B5E8" },
  datarobot: { name: "DataRobot", color: "#2D9CDB" },
  "qlik-predict": { name: "Qlik Predict", color: "#009848" },

  // Process Intelligence
  mpmx: { name: "mpmX", color: "#0066CC" },

  // Planning
  aimplan: { name: "Aimplan", color: "#1E88E5" },
  planacy: { name: "Planacy", color: "#FF6B35" },
  dataplus: { name: "Dataplus", color: "#5D3FD3" },

  // Automation
  "power-platform": { name: "Power Platform", color: "#742774" },
  uipath: { name: "UiPath", color: "#FA4616" },
  "power-automate": { name: "Power Automate", color: "#0066FF" },

  // Integration
  dbt: { name: "dbt", color: "#FF694A" },
  talend: { name: "Qlik Talend", color: "#FF6D00" },
  alteryx: { name: "Alteryx", color: "#0070C0" },
  adf: { name: "Azure Data Factory", color: "#0078D4" },
};

// Vite eager-glob real SVG files. Filename (without extension) becomes the key.
const partnerSvgs = import.meta.glob("../assets/drake/logos/partners/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function partnerSvgUrl(key: string): string | undefined {
  const match = Object.entries(partnerSvgs).find(([path]) =>
    path.toLowerCase().endsWith(`/${key}.svg`)
  );
  return match?.[1];
}

// Optional alias: if we have an svg under a different filename than the key
const SVG_ALIASES: Record<string, string> = {
  "google-cloud": "googlecloud",
  cortex: "snowflake",
  cortex_: "snowflake",
};

export function getPartnerSvg(key: string): string | undefined {
  return partnerSvgUrl(key) ?? (SVG_ALIASES[key] ? partnerSvgUrl(SVG_ALIASES[key]) : undefined);
}
