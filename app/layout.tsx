import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Providers } from "./providers";
import User from "./ui/user";

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
          <User />
          {children}
        </Providers>
      </body>
    </html>
  );
}
