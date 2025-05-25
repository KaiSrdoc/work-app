"use client";

import { Container } from "@mantine/core";
import { Goals } from "./components/goals/goals";
import Work from "./components/work/work";

export default function Home() {
  return (
    <Container size="lg" py="xl">
      <Goals />
      <Work />
    </Container>
  );
}
