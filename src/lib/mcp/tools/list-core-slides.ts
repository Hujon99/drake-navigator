import { defineTool } from "@lovable.dev/mcp-js";
import { coreSlides } from "@/content/core-slides";

export default defineTool({
  name: "list_core_slides",
  title: "List core slides",
  description:
    "List the core pitch slides of the Drake Analytics deck (cover, who we are, value chain, partners) with eyebrow, title and body copy.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(coreSlides, null, 2) }],
    structuredContent: { slides: coreSlides },
  }),
});
