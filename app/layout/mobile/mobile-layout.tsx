import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMantineColorScheme } from '@mantine/core';
import { BluebirdLogo } from '@bluebird-monorepo/bluebird-ui';
import { IconSearch, IconBell, IconSun, IconMoon } from '@tabler/icons-react';
import { Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MobileAvatar } from './avatar/mobile-avatar';
import { usePagesLinks } from '../use-pages-links';
import { useSidebarLayoutStore } from '../sidebar/sidebar-layout.store';
import { DrawerLayout } from '../drawer/drawer-layout';
import { SidebarLayoutDrawer } from '../sidebar/drawer/sidebar-layout-drawer';
import { HeaderPageLayout } from '../page/header-page-layout';
import classes from './mobile-layout.module.css';
import sidebarClasses from '../sidebar/sidebar-layout.module.css';
import { NotificationBell } from '../sidebar/navbar/footer/notifications/notification-bell';

export function MobileLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { links, developmentLinks, showDevelopmentPages } = usePagesLinks();
  const { isDrawerOpen } = useSidebarLayoutStore();

  const handleLogoClick = () => {
    navigate('/');
    close();
  };

  const drawer = (
    <HeaderPageLayout.Drawer>
      <DrawerLayout>
        <SidebarLayoutDrawer />
      </DrawerLayout>
    </HeaderPageLayout.Drawer>
  );

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="md" justify="space-between" style={{ flex: 1 }}>
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
            <div className={classes.logoContainer} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <BluebirdLogo size={30} inverted />
              <span className={classes.logoLabel}>BlueHire</span>
            </div>
          </Group>

          <Group gap="xs">
            <ActionIcon variant="subtle" color="white" size="lg">
              <IconSearch size={22} />
            </ActionIcon>
            <NotificationBell hideLabel />
            <ActionIcon variant="subtle" color="white" size="lg" onClick={() => toggleColorScheme()}>
              {colorScheme === 'dark' ? <IconSun size={22} /> : <IconMoon size={22} />}
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
        {showDevelopmentPages && (
          <Stack justify="center" gap={0} className={classes.navbarContent} mt="xl">
            {developmentLinks}
          </Stack>
        )}
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        <HeaderPageLayout
          drawer={drawer}
          isDrawerOpen={isDrawerOpen}
          classNames={{ container: sidebarClasses.contentContainer, mainContent: sidebarClasses.mainContent }}
        >
          <Outlet />
        </HeaderPageLayout>
      </AppShell.Main>
    </AppShell>
  );
}
