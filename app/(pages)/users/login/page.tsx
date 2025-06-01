"use client";

import { useEffect } from "react";
import {
  Paper,
  Title,
  Group,
  Text,
  Card,
  Divider,
  useMantineColorScheme,
  ActionIcon,
} from "@mantine/core";
import { GoogleButton } from "./google-button";
import { useAuth } from "../api/use-auth";
import { IconSun, IconMoon, IconBriefcase } from "@tabler/icons-react";
import classes from "./login-page.module.css";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { isLoading, isAuthenticated, signIn } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      redirect("/");
    }
  }, [isAuthenticated, isLoading]);

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <div className={classes.wrapper} data-color-scheme={colorScheme}>
      <Paper
        className={classes.form}
        radius={0}
        p={30}
        data-color-scheme={colorScheme}
      >
        <Group gap="sm" justify="center">
          <IconBriefcase size={24} />
          <Title order={2} className={classes.title}>
            Work App
          </Title>
        </Group>
        <Card
          withBorder
          radius="md"
          p="xl"
          className={classes.card}
          data-color-scheme={colorScheme}
        >
          <Text
            size="lg"
            fw={500}
            ta="center"
            mb="xs"
            c={colorScheme === "dark" ? "dark.0" : "dark.9"}
          >
            Welcome to Work App, login with
          </Text>
          <GoogleButton
            radius="md"
            fullWidth
            size="md"
            mb="md"
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </GoogleButton>
          <Divider
            label="Don't have an account?"
            labelPosition="center"
            my="lg"
            color={colorScheme === "dark" ? "dark.4" : "gray.3"}
          />
          <Text
            c={colorScheme === "dark" ? "dark.2" : "dimmed"}
            size="sm"
            ta="center"
            mx="auto"
            w={240}
          >
            Only members of the organization can access this platform.
          </Text>
        </Card>
        <div className={classes.themeSwitcher}>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size="lg"
            aria-label="Toggle color scheme"
          >
            {colorScheme === "dark" ? (
              <IconSun size={18} />
            ) : (
              <IconMoon size={18} />
            )}
          </ActionIcon>
        </div>
      </Paper>
    </div>
  );
}
