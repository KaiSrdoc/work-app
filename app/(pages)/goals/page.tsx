"use client";

import { Button, Container, Group, Stack, Title } from "@mantine/core";
import { useWorkStore } from "@/app/work.store";
import { GoalProgress } from "./ui/goal-progress";
import { GoalForm } from "./ui/goal-form";
import { IconPlus } from "@tabler/icons-react";
import { useGetGoals } from "@/app/(pages)/goals/api/use-get-goals";

export default function Goals() {
  const { openGoalForm } = useWorkStore();
  const { data: goals } = useGetGoals();

  return (
    <Container size="lg">
      <Stack gap="0">
        <Group justify="space-between" align="center" mb="xl">
          <Title order={1} ta="left">
            Goals
          </Title>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => openGoalForm()}
          >
            Add Goal
          </Button>
        </Group>
        <Stack>
          {goals?.map((goal) => (
            <GoalProgress key={goal.id} goal={goal} />
          ))}
          <GoalForm />
        </Stack>
      </Stack>
    </Container>
  );
}
