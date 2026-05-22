export type ModuleSlug =
  | "dataplattform"
  | "process-intelligence"
  | "applications"
  | "bi-analytics"
  | "planning"
  | "data-strategy";

export type CaseSlug =
  | "partner-inkasso"
  | "siemens-energy"
  | "abbvie"
  | "mpmx-quote-to-cash"
  | "bi-retail"
  | "planning-finance"
  | "data-strategy-public"
  | "setlr-multi";

export interface ModuleContent {
  slug: ModuleSlug;
  number: string;
  title: string;
  tagline: string;
  problem: string;
  solution: { heading: string; body: string }[];
  outcome: { metric?: string; label: string; body: string }[];
  nextStep: string;
  partners: string[];
  caseSlug: CaseSlug;
}

export interface CaseContent {
  slug: CaseSlug;
  client: string;
  title: string;
  modules: ModuleSlug[];
  challenge: string;
  approach: string[];
  results: { metric: string; label: string }[];
  tech: string[];
}
