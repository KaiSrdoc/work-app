"use client";

import { AppShell, Burger, Group, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { Stack } from "@mantine/core";
import { MobileAvatar } from "./avatar/mobile-avatar";
import { usePagesLinks } from "../use-pages-links";
import classes from "./mobile-layout.module.css";
import { NavbarLogo } from "../sidebar/navbar/logo/logo";

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { links } = usePagesLinks();

  const handleLogoClick = () => {
    close();
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="md" justify="space-between" style={{ flex: 1 }}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              color="white"
            />
            <div
              className={classes.logoContainer}
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            >
              <NavbarLogo />
              <span className={classes.logoLabel}>Work App</span>
            </div>
          </Group>

          <Group gap="sm">
            <ActionIcon
              variant="subtle"
              color="white"
              size="lg"
              onClick={() => toggleColorScheme()}
            >
              {colorScheme === "dark" ? (
                <IconSun size={22} />
              ) : (
                <IconMoon size={22} />
              )}
            </ActionIcon>
            <MobileAvatar />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        py="md"
        px={4}
        className={classes.navbar}
        onClick={() => {
          toggle();
        }}
      >
        <Stack justify="center" gap={0} className={classes.navbarContent}>
          {links}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>{children}</AppShell.Main>
    </AppShell>
  );
}
