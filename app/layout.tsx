import "./globals.css";
import RootStyleRegistry from "./emotion";
import Appshell from "../components/appshell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <RootStyleRegistry>
        <Appshell>{children}</Appshell>
      </RootStyleRegistry>
    </html>
  );
}
