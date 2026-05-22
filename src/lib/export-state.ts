import type { ModuleSlug } from "@/content/types";

export interface ExportState {
  /** Slide numbers (1-5) from coreSlides to include */
  core: number[];
  /** Modules to include and whether to include each module's case */
  modules: Array<{ slug: ModuleSlug; includeCase: boolean }>;
  /** Customer name shown on the cover (optional) */
  customer: string;
  /** Date string (YYYY-MM-DD) shown on the cover */
  date: string;
}

export function defaultExportState(): ExportState {
  return {
    core: [1, 2, 3, 4],
    modules: [],
    customer: "",
    date: new Date().toISOString().slice(0, 10),
  };
}

function toBase64Url(str: string): string {
  // btoa only handles latin1; encode UTF-8 first
  const utf8 = unescape(encodeURIComponent(str));
  return btoa(utf8).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(b64: string): string {
  const padded = b64.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((b64.length + 3) % 4);
  return decodeURIComponent(escape(atob(padded)));
}

export function encodeExportState(state: ExportState): string {
  return toBase64Url(JSON.stringify(state));
}

export function decodeExportState(encoded: string): ExportState | null {
  try {
    const parsed = JSON.parse(fromBase64Url(encoded));
    if (!parsed || typeof parsed !== "object") return null;
    if (!Array.isArray(parsed.core) || !Array.isArray(parsed.modules)) return null;
    return parsed as ExportState;
  } catch {
    return null;
  }
}
