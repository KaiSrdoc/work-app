import { Title, Progress, Text, Group, ActionIcon, Stack } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useWorkStore, Goal } from "@/app/work.store";

interface GoalProgressProps {
  goal: Goal;
}

export function GoalProgress({ goal }: GoalProgressProps) {
  const { workEntries, openGoalForm } = useWorkStore();
  const totalMoneyEarned = workEntries
    .filter((entry) => entry.goal_id === goal.id)
    .reduce((sum, entry) => sum + entry.money_earned, 0);
  const goalPercentage = (totalMoneyEarned / goal.total) * 100;

  const ticks = Array.from({ length: 5 }, (_, i) =>
    Math.round((i * goal.total) / 4)
  );

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <Title order={2} ta="left">
          {goal.title}
        </Title>
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => openGoalForm(goal.id)}
        >
          <IconEdit size={16} />
        </ActionIcon>
      </Group>
      <Stack gap="0">
        <Progress color="yellow" size="xl" value={goalPercentage} striped />
        <Group justify="space-between">
          {ticks.map((tick) => (
            <Text key={tick} size="sm">
              {tick}
            </Text>
          ))}
        </Group>
      </Stack>
    </Stack>
  );
}
