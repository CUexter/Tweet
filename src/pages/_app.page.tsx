import type { AppContext } from "next/app";
import type { AppProps } from "next/app";

import { getCookie, setCookie } from "cookies-next";
import { type Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import App from "next/app";
import { useState } from "react";

import "@/styles/globals.css";
import type { ColorScheme } from "@mantine/core";

import { api } from "@/utils/api";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

interface OwnProps extends Record<string, unknown> {
  session: Session | null;
  colorSchemeProps: ColorScheme | null;
}

type MyAppProps = Omit<AppProps, "pageProps"> & { pageProps: OwnProps };

const MyApp = ({
  Component,
  pageProps: { colorSchemeProps, session, ...pageProps },
}: MyAppProps) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    colorSchemeProps || preferredColorScheme
  );
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const session = await getSession(appContext);
  const props = {
    ...appProps,
    session: session,
    colorSchemeProps: getCookie(
      "mantine-color-scheme",
      appContext.ctx
    ) as ColorScheme,
  };
  return { pageProps: props };
};

export default api.withTRPC(MyApp);
