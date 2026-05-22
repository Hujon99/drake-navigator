import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({ s: z.string().optional() });

export const Route = createFileRoute("/export/print")({
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    const params = new URLSearchParams();
    const state = search.s;

    if (typeof state === "string" && state.length > 0) {
      params.set("s", state);
    }

    throw redirect({
      to: "/export-print",
      search: params.size > 0 ? { s: params.get("s") ?? undefined } : undefined,
      replace: true,
    });
  },
});