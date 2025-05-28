import { Button, Group, Stack, Title } from "@mantine/core";
import { useWorkStore } from "../../work.store";
import { GoalProgress } from "./goal-progress";
import { GoalForm } from "./goal-form";
import { IconPlus } from "@tabler/icons-react";

export function Goals() {
  const { goals, openGoalForm } = useWorkStore();

  return (
    <Stack gap="0">
      <Group justify="space-between" align="center" mb="xl">
        <Title order={1} ta="left">
          My Goals
        </Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => openGoalForm()}
        >
          Add Goal
        </Button>
      </Group>
      <Stack>
        {goals.map((goal) => (
          <GoalProgress key={goal.id} goal={goal} />
        ))}
        <GoalForm />
      </Stack>
    </Stack>
  );
}
