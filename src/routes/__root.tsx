/// <reference types="vite/client" />

import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { getAuth } from "@clerk/tanstack-react-start/server";
import { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { NuqsAdapter } from "nuqs/adapters/react";
import type * as React from "react";
import { Toaster } from "sonner";

import { DefaultCatchBoundary } from "~/components/default-catch-boundary";
import { TooltipProvider } from "~/components/ui/tooltip";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const auth = await getAuth(getWebRequest());
  const token = await auth.getToken({ template: "convex" });

  return {
    userId: auth.userId,
    token,
  };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "NoStress - Players Collections",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  beforeLoad: async (ctx) => {
    const auth = await fetchClerkAuth();
    const { userId, token } = auth;

    // During SSR only (the only time serverHttpClient exists),
    // set the Clerk auth token to make HTTP queries with.
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }

    return {
      userId,
      token,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
});

function RootComponent() {
  const context = useRouteContext({ from: Route.id });
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={context.convexClient} useAuth={useAuth}>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex-grow min-h-0 h-full flex flex-col">
          <NuqsAdapter>
            <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
          </NuqsAdapter>
        </div>
        <Toaster />
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
