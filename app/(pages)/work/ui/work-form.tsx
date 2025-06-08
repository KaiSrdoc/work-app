import {
  Modal,
  NumberInput,
  Stack,
  Button,
  Select,
  Text,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import { useWorkStore } from "@/app/work.store";
import { IconTrash } from "@tabler/icons-react";
import { useGetWork } from "../api/use-get-work";
import { useUpsertWork } from "../api/use-upsert-work";
import { useDeleteWork } from "../api/use-delete-work";
import { useGetGoals } from "../../goals/api/use-get-goals";

export function WorkForm() {
  const { isWorkFormOpen, workEditingId, closeWorkForm } = useWorkStore();
  const { data: work = [] } = useGetWork();
  const { data: goals = [] } = useGetGoals();
  const { mutate: upsertWork } = useUpsertWork();
  const { mutate: deleteWork } = useDeleteWork();

  const [date, setDate] = useState<Date | null>(null);
  const [hoursWorked, setHoursWorked] = useState<number | "">(0);
  const [moneyEarned, setMoneyEarned] = useState<number | "">(0);
  const [goalId, setGoalId] = useState<number>();

  useEffect(() => {
    if (workEditingId !== null) {
      const entry = work.find((e) => e.id === workEditingId);
      if (entry) {
        setDate(entry.work_date ? new Date(entry.work_date) : null);
        setHoursWorked(entry.hours_worked || 0);
        setMoneyEarned(entry.money_earned || 0);
        setGoalId(entry.goal_id);
      }
    } else {
      setDate(null);
      setHoursWorked(0);
      setMoneyEarned(0);
      setGoalId(goals[0]?.id);
    }
  }, [workEditingId, work, goals]);

  useEffect(() => {
    if (hoursWorked !== "") {
      setMoneyEarned(Number(hoursWorked) * 50);
    }
  }, [hoursWorked]);

  const handleSubmit = () => {
    if (date && hoursWorked && moneyEarned) {
      const entry = {
        id: workEditingId || undefined,
        work_date: date.toISOString().split("T")[0],
        hours_worked: Number(hoursWorked),
        money_earned: Number(moneyEarned),
        goal_id: goalId,
      };
      upsertWork(entry);
      closeWorkForm();
    }
  };

  const handleDelete = () => {
    if (workEditingId) {
      deleteWork(workEditingId);
      closeWorkForm();
    }
  };

  const handleDateChange = (value: string | null) => {
    setDate(value ? new Date(value) : null);
  };

  return (
    <Modal
      opened={isWorkFormOpen}
      onClose={closeWorkForm}
      title={
        <Group justify="space-between" align="center">
          <Text size="xl" fw={700}>
            {workEditingId !== null ? "Edit Work Work" : "Add Work Work"}
          </Text>
          {workEditingId !== null && (
            <Tooltip label="Delete entry">
              <ActionIcon variant="subtle" color="red" onClick={handleDelete}>
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      }
    >
      <Stack>
        <DatePicker
          mx="auto"
          value={date?.toISOString().split("T")[0] || ""}
          onChange={handleDateChange}
        />
        <NumberInput
          label="Hours Worked"
          placeholder="Enter hours"
          value={hoursWorked}
          onChange={(val) => setHoursWorked(val as number | "")}
          min={0}
        />
        <NumberInput
          label="Money Earned"
          placeholder="Calculated based on hours"
          value={moneyEarned}
          readOnly
          suffix="€"
        />
        <Select
          label="Goal"
          placeholder="Select a goal"
          value={goalId?.toString() || ""}
          onChange={(value) => setGoalId(value ? Number(value) : undefined)}
          data={goals.map((goal) => ({
            value: goal.id.toString(),
            label: goal.title || "",
          }))}
        />
        <Button onClick={handleSubmit}>
          {workEditingId !== null ? "Update" : "Save"}
        </Button>
      </Stack>
    </Modal>
  );
}
