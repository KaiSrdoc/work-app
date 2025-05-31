import { Stack } from "@mantine/core";
import classes from "./navbar.module.css";
import { NavbarLogo } from "./logo/logo";
import { NavbarFooter } from "./footer/footer";
import { useMantineColorScheme } from "@mantine/core";
import { usePagesLinks } from "../../use-pages-links";

export function Navbar() {
  const { links } = usePagesLinks();
  const { colorScheme } = useMantineColorScheme();

  return (
    <nav className={`${classes.navbar}`} data-color-scheme={colorScheme}>
      <NavbarLogo />
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
      <NavbarFooter />
    </nav>
  );
}
