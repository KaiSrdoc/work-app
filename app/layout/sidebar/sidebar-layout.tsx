"use client";

import { Box } from "@mantine/core";
import { Navbar } from "./navbar/navbar";
import { useMantineColorScheme } from "@mantine/core";
import classes from "./sidebar-layout.module.css";
import { useAuth } from "@/app/(pages)/users/api/use-auth";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useMantineColorScheme();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Box className={classes.layout} data-color-scheme={colorScheme}>
      <Box className={classes.navbarWrapper}>
        <Navbar />
      </Box>
      <Box className={classes.content} data-color-scheme={colorScheme}>
        {children}
      </Box>
    </Box>
  );
}
