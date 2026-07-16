import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { modules } from "@/content/modules";

export default defineTool({
  name: "get_module",
  title: "Get module",
  description:
    "Get full content for one Drake Analytics module by slug: problem, solution blocks, outcomes, next step, partners and the linked customer case slug.",
  inputSchema: {
    slug: z
      .string()
      .describe("Module slug, e.g. 'dataplattform', 'process-intelligence', 'applications', 'bi-analytics', 'planning', 'data-strategy'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const mod = modules.find((m) => m.slug === slug);
    if (!mod) {
      return {
        content: [{ type: "text", text: `No module found with slug "${slug}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(mod, null, 2) }],
      structuredContent: { module: mod },
    };
  },
});
