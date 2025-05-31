import {
  Modal,
  TextInput,
  NumberInput,
  Stack,
  Button,
  Text,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useWorkStore } from "@/app/work.store";
import { useUpsertGoal } from "../api/use-upsert-goal";
import { useGetGoals } from "../api/use-get-goals";
import { useDeleteGoal } from "../api/use-delete-goal";

export function GoalForm() {
  const { isGoalFormOpen, goalEditingId, closeGoalForm } = useWorkStore();
  const { data: goals = [] } = useGetGoals();
  const { mutate: upsertGoal } = useUpsertGoal();
  const { mutate: deleteGoal } = useDeleteGoal();

  const [title, setTitle] = useState("");
  const [total, setTotal] = useState<number | "">(0);

  useEffect(() => {
    if (goalEditingId !== null) {
      const goal = goals.find((g) => g.id === goalEditingId);
      if (goal) {
        setTitle(goal.title || "");
        setTotal(goal.total || 0);
      }
    } else {
      setTitle("");
      setTotal(0);
    }
  }, [goalEditingId, goals]);

  const handleSubmit = () => {
    if (title && total) {
      const goal = {
        id: goalEditingId || undefined,
        title,
        total: Number(total),
      };
      upsertGoal(goal);
      closeGoalForm();
    }
  };

  const handleDelete = () => {
    if (goalEditingId) {
      deleteGoal(goalEditingId);
      closeGoalForm();
    }
  };

  return (
    <Modal
      opened={isGoalFormOpen}
      onClose={closeGoalForm}
      title={
        <Group justify="space-between" align="center">
          <Text size="xl" fw={700}>
            {goalEditingId !== null ? "Edit Goal" : "Add Goal"}
          </Text>
          {goalEditingId && (
            <Tooltip label="Delete goal">
              <ActionIcon variant="subtle" color="red" onClick={handleDelete}>
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      }
    >
      <Stack>
        <TextInput
          label="Title"
          placeholder="Enter goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <NumberInput
          label="Total Amount"
          placeholder="Enter total amount"
          value={total}
          onChange={(val) => setTotal(val as number | "")}
          min={0}
          suffix="€"
        />
        <Button onClick={handleSubmit} disabled={!title || Number(total) < 5}>
          {goalEditingId !== null ? "Update" : "Save"}
        </Button>
      </Stack>
    </Modal>
  );
}
