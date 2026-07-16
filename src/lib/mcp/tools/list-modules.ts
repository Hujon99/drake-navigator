import { defineTool } from "@lovable.dev/mcp-js";
import { modules } from "@/content/modules";

export default defineTool({
  name: "list_modules",
  title: "List modules",
  description:
    "List Drake Analytics service modules (Dataplattform, Process Intelligence, Applications, BI & Analytics, Planning, Data Strategy) with slug, number, title and tagline.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = modules.map((m) => ({
      slug: m.slug,
      number: m.number,
      title: m.title,
      tagline: m.tagline,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { modules: items },
    };
  },
});
