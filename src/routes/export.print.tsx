import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({ s: z.string().optional() });

export const Route = createFileRoute("/export/print")({
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/rapport",
      search: search.s ? { s: search.s } : undefined,
      replace: true,
    });
  },
});