import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Providers } from "./providers";
import { SidebarLayout } from "./layout/sidebar/sidebar-layout";

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
      <body>
        <Providers>
          <SidebarLayout>{children}</SidebarLayout>
        </Providers>
      </body>
    </html>
  );
}
