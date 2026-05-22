import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="max-w-md text-center">
        <p className="da-eyebrow mb-4">404</p>
        <h1 className="da-display text-4xl mb-3">Sidan finns inte</h1>
        <p className="text-drake-mid mb-6">Länken kan vara felaktig eller borttagen.</p>
        <Link
          to="/hub"
          className="inline-flex items-center justify-center rounded-md bg-drake-sky px-5 py-3 text-sm font-display uppercase tracking-[0.14em] text-white hover:bg-drake-deep transition-colors"
        >
          Till översikt
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="max-w-md text-center">
        <p className="da-eyebrow mb-4">Något gick fel</p>
        <h1 className="da-display text-3xl mb-3">Sidan laddades inte</h1>
        <p className="text-drake-mid mb-6 text-sm">{error.message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-drake-sky px-4 py-2 text-xs font-display uppercase tracking-[0.14em] text-white hover:bg-drake-deep"
          >
            Försök igen
          </button>
          <Link to="/" className="rounded-md border border-drake-line px-4 py-2 text-xs font-display uppercase tracking-[0.14em]">
            Till start
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Drake Analytics — From Insight to Action" },
      { name: "description", content: "Interaktivt säljstöd för Drake Analytics — data, AI och analys från strategi till produktion." },
      { name: "author", content: "Drake Analytics" },
      { property: "og:title", content: "Drake Analytics — From Insight to Action" },
      { property: "og:description", content: "Vi hjälper organisationer omsätta data till mätbart värde." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
