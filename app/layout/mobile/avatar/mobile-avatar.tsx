import { Avatar, Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useAuth } from "@/app/(pages)/users/api/use-auth";
import classes from "./mobile-avatar.module.css";

export function MobileAvatar() {
  const { user, signOut } = useAuth();

  return (
    <Menu position="bottom-end" offset={5} shadow="md">
      <Menu.Target>
        <Avatar
          src={user?.avatar}
          alt={user?.name}
          size={40}
          radius="xl"
          className={classes.avatar}
          color="white"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{user?.name}</Menu.Label>
        <Menu.Item
          leftSection={<IconLogout size={14} />}
          onClick={() => signOut()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
