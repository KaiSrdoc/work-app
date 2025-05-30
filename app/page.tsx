"use client";

import { Button, Container, Group, Avatar, Text } from "@mantine/core";
import { Goals } from "./pages/goals/ui/goals";
import Work from "./pages/work/ui/work";
import { signInWithGoogle } from "./pages/users/api/auth";
import { useGetCurrentUser } from "./pages/users/api/use-get-user";

export default function Home() {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <Container size="lg" py="xl">
      {currentUser ? (
        <Group mb="xl" align="center">
          <Avatar src={currentUser?.avatar} size="md" radius="xl" />
          <Text size="lg" fw={500}>
            {currentUser.name}
          </Text>
        </Group>
      ) : (
        <Button onClick={signInWithGoogle} mb="xl">
          Sign in with Google
        </Button>
      )}
      <Goals />
      <Work />
    </Container>
  );
}
