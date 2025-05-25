"use client";

import { Container, Title } from "@mantine/core";
import { TuitionProgress } from "./components/tuition-progress";
import Work from "./components/work/work";

export default function Home() {
  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="left" mb="xl">
        Kai&apos;s Work
      </Title>

      <TuitionProgress />
      <Work />
    </Container>
  );
}
