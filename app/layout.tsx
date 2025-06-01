import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Body from "./body";

export const metadata = {
  title: "Work App",
  description: "Track your work and goals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <Body>{children}</Body>
    </html>
  );
}
