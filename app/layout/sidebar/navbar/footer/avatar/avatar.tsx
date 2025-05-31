import { Avatar, UnstyledButton, Menu, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useAuth } from "@/app/(pages)/users/api/use-auth";
import classes from "./avatar.module.css";

export function NavbarAvatar() {
  const { user, signOut } = useAuth();

  return (
    <Menu shadow="md" width={200} position="top-start">
      <Menu.Target>
        <UnstyledButton className={classes.link}>
          <div className={classes.linkInner}>
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              size={40}
              radius="xl"
              color="white"
            />
            <span className={classes.linkLabel}>{user?.name}</span>
          </div>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconLogout size={14} />}
          onClick={() => signOut()}
        >
          <Text size="sm">Logout</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
