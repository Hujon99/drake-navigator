import { defineMcp } from "@lovable.dev/mcp-js";
import listModulesTool from "./tools/list-modules";
import getModuleTool from "./tools/get-module";
import listCasesTool from "./tools/list-cases";
import getCaseTool from "./tools/get-case";
import listCoreSlidesTool from "./tools/list-core-slides";

export default defineMcp({
  name: "drake-analytics-mcp",
  title: "Drake Analytics",
  version: "0.1.0",
  instructions:
    "Read-only access to Drake Analytics' public pitch content: service modules, customer cases and core deck slides. Use list_modules / list_cases / list_core_slides to browse, then get_module / get_case to fetch full content by slug.",
  tools: [listModulesTool, getModuleTool, listCasesTool, getCaseTool, listCoreSlidesTool],
});
