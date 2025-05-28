"use client";

import { Container } from "@mantine/core";
import { Goals } from "./components/goals/goals";
import Work from "./components/work/work";
import { useGetUsers } from "./pages/users/api/use-get-users";

export default function Home() {
  const { data: users } = useGetUsers();
  console.log(users);
  return (
    <Container size="lg" py="xl">
      <Goals />
      <Work />
    </Container>
  );
}
