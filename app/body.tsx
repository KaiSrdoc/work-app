"use client";

import { Providers } from "./providers";
import { SidebarLayout } from "./layout/sidebar/sidebar-layout";
import { useMediaQuery } from "@mantine/hooks";
import { MobileLayout } from "./layout/mobile/mobile-layout";

export default function Body({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const Layout = isMobile ? MobileLayout : SidebarLayout;

  return (
    <body>
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </body>
  );
}
