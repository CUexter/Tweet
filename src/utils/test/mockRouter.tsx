/* inspired and from getinnocuous: https://github.com/trpc/trpc/discussions/3612 */

import type { AppRouter } from "@/server/api/root";
import type { RenderOptions } from "@testing-library/react";
import type { ResponseTransformer } from "msw";
import type { ReactElement } from "react";

import { opts } from "@/utils/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { createTRPCReact } from "@trpc/react-query";
import fetch from "cross-fetch";
import { createTRPCMsw } from "msw-trpc";
import { setupServer } from "msw/node";
import React from "react";
import superjson from "superjson";

global.fetch = fetch;

const opt = opts(true);

const mockedtRPC = createTRPCReact<AppRouter>({
  unstable_overrides: opt.unstable_overrides,
});

const mockedtRPCClient = mockedtRPC.createClient(opt.config({}));
const mockedQueryClient = new QueryClient();

export const TRPClientProvider = (props: { children: React.ReactNode }) => {
  return (
    <mockedtRPC.Provider
      client={mockedtRPCClient}
      queryClient={mockedQueryClient}
    >
      <QueryClientProvider client={mockedQueryClient}>
        {props.children}
      </QueryClientProvider>
    </mockedtRPC.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, {
    wrapper: (props) => <TRPClientProvider {...props} />,
    ...options,
  });
};

export const trpcMsw = createTRPCMsw<AppRouter>({
  transformer: { input: superjson, output: superjson },
});

const exampleHandler = trpcMsw.example.hello.query((req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.data({ greeting: "Hello from tRPC" }) as unknown as ResponseTransformer
  );
});

const secretHandler = trpcMsw.example.getSecretMessage.query(
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.data("secret") as unknown as ResponseTransformer
    );
  }
);
export const server = setupServer(exampleHandler, secretHandler);

export { customRender as render };
