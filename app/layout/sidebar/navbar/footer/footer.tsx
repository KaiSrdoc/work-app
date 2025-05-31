import { Stack } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { NavbarLink } from "../navbar-link";
import { NavbarAvatar } from "./avatar/avatar";
import { useMantineColorScheme } from "@mantine/core";
import classes from "./footer.module.css";

export function NavbarFooter() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div className={classes.navbarFooter}>
      <Stack justify="center" gap={0}>
        <NavbarLink
          icon={colorScheme === "dark" ? IconSun : IconMoon}
          label={colorScheme === "dark" ? "Light mode" : "Dark mode"}
          onClick={() => toggleColorScheme()}
        />
        <div className={classes.avatarWrapper}>
          <NavbarAvatar />
        </div>
      </Stack>
    </div>
  );
}
