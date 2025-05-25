"use client";

import { Container, Title, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Goals } from "./components/goals/goals";
import Work from "./components/work/work";
import { useWorkStore } from "./work.store";

export default function Home() {
  const { openGoalForm } = useWorkStore();

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" align="center" mb="xl">
        <Title order={1} ta="left">
          Kai&apos;s Work
        </Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => openGoalForm()}
        >
          Add Goal
        </Button>
      </Group>

      <Goals />
      <Work />
    </Container>
  );
}
