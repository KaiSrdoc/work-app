"use client";

import { Providers } from "./providers";
import { SidebarLayout } from "./layout/sidebar/sidebar-layout";
import { useMediaQuery } from "@mantine/hooks";
import { MobileLayout } from "./layout/mobile/mobile-layout";
import { ProtectedRoute } from "./(pages)/users/api/use-auth";

export default function Body({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const ResponsiveLayout = isMobile ? MobileLayout : SidebarLayout;

  return (
    <body>
      <Providers>
        <ProtectedRoute>
          <ResponsiveLayout>{children}</ResponsiveLayout>
        </ProtectedRoute>
      </Providers>
    </body>
  );
}
