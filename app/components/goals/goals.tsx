import { Stack } from "@mantine/core";
import { useWorkStore } from "../../work.store";
import { GoalProgress } from "./goal-progress";
import { GoalForm } from "./goal-form";

export function Goals() {
  const { goals } = useWorkStore();

  return (
    <Stack>
      {goals.map((goal) => (
        <GoalProgress key={goal.id} goal={goal} />
      ))}
      <GoalForm />
    </Stack>
  );
}
