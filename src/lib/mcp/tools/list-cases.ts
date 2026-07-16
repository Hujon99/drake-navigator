import { defineTool } from "@lovable.dev/mcp-js";
import { cases } from "@/content/cases";

export default defineTool({
  name: "list_cases",
  title: "List customer cases",
  description:
    "List Drake Analytics customer cases with slug, client, title and the modules each case relates to.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = cases.map((c) => ({
      slug: c.slug,
      client: c.client,
      title: c.title,
      modules: c.modules,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { cases: items },
    };
  },
});
