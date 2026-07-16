import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { cases } from "@/content/cases";

export default defineTool({
  name: "get_case",
  title: "Get customer case",
  description:
    "Get full content for one Drake Analytics customer case by slug: challenge, approach, results and technology used.",
  inputSchema: {
    slug: z.string().describe("Case slug, e.g. 'siemens-energy', 'partner-inkasso', 'abbvie'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const c = cases.find((x) => x.slug === slug);
    if (!c) {
      return {
        content: [{ type: "text", text: `No case found with slug "${slug}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(c, null, 2) }],
      structuredContent: { case: c },
    };
  },
});
