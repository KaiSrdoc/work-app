import {
  Title,
  Progress,
  Text,
  Group,
  ActionIcon,
  Stack,
  Box,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useWorkStore } from "@/app/work.store";
import { useGetWork } from "../../work/api/use-get-work";
import { Goal } from "@/libs/supabase/entities.types";

interface GoalProgressProps {
  goal: Goal;
}

export function GoalProgress({ goal }: GoalProgressProps) {
  const { openGoalForm } = useWorkStore();
  const { data: work = [] } = useGetWork();

  const totalMoneyEarned = work
    .filter((entry) => entry.goal_id === goal.id)
    .reduce((sum, entry) => sum + (entry.money_earned || 0), 0);
  const goalPercentage = (totalMoneyEarned / (goal.total || 0)) * 100;

  const ticks = Array.from({ length: 5 }, (_, i) =>
    Math.round((i * (goal.total || 0)) / 4)
  );

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <Title order={2} ta="left">
          {goal.title || ""}
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
            <Box key={tick} className="relative h-4 w-1">
              <Text
                size="sm"
                className="absolute left-1/2 top-0 -translate-x-1/2 w-max"
              >
                {tick}
              </Text>
            </Box>
          ))}
        </Group>
      </Stack>
    </Stack>
  );
}
