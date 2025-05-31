"use client";

import { Button, Container, Group, Avatar, Text } from "@mantine/core";
import { signInWithGoogle } from "@/app/(pages)/users/api/auth";
import { useGetCurrentUser } from "@/app/(pages)/users/api/use-get-user";

export default function User() {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <Container size="lg" pt="xl">
      {currentUser ? (
        <Group mb="xl" align="center">
          <Avatar src={currentUser?.avatar} size="md" radius="xl" />
          <Text size="lg" fw={500}>
            {currentUser.name || "Guest"}
          </Text>
        </Group>
      ) : (
        <Button onClick={signInWithGoogle} mb="xl">
          Sign in with Google
        </Button>
      )}
    </Container>
  );
}
