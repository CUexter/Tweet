"use client";

import { AppShell, Navbar, Header } from "@mantine/core";
import React from "react";
import { DoubleNavbar } from "./navbars";

export default function Appshell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={<DoubleNavbar />}
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
