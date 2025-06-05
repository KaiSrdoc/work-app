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
import { useGetWorkEntries } from "../api/use-get-work-entries";
import { useUpsertWorkEntry } from "../api/use-upsert-work-entries";
import { useDeleteWorkEntry } from "../api/use-delete-work-entry";
import { useGetGoals } from "../../goals/api/use-get-goals";

export function WorkEntryForm() {
  const { isEntryFormOpen, workEntryEditingId, closeEntryForm } =
    useWorkStore();
  const { data: workEntries = [] } = useGetWorkEntries();
  const { data: goals = [] } = useGetGoals();
  const { mutate: upsertWorkEntry } = useUpsertWorkEntry();
  const { mutate: deleteWorkEntry } = useDeleteWorkEntry();

  const [date, setDate] = useState<Date | null>(null);
  const [hoursWorked, setHoursWorked] = useState<number | "">(0);
  const [moneyEarned, setMoneyEarned] = useState<number | "">(0);
  const [goalId, setGoalId] = useState<number>();

  useEffect(() => {
    if (workEntryEditingId !== null) {
      const entry = workEntries.find((e) => e.id === workEntryEditingId);
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
  }, [workEntryEditingId, workEntries, goals]);

  useEffect(() => {
    if (hoursWorked !== "") {
      setMoneyEarned(Number(hoursWorked) * 50);
    }
  }, [hoursWorked]);

  const handleSubmit = () => {
    if (date && hoursWorked && moneyEarned) {
      const entry = {
        id: workEntryEditingId || undefined,
        work_date: date.toISOString().split("T")[0],
        hours_worked: Number(hoursWorked),
        money_earned: Number(moneyEarned),
        goal_id: goalId,
      };
      upsertWorkEntry(entry);
      closeEntryForm();
    }
  };

  const handleDelete = () => {
    if (workEntryEditingId) {
      deleteWorkEntry(workEntryEditingId);
      closeEntryForm();
    }
  };

  const handleDateChange = (value: string | null) => {
    setDate(value ? new Date(value) : null);
  };

  return (
    <Modal
      opened={isEntryFormOpen}
      onClose={closeEntryForm}
      title={
        <Group justify="space-between" align="center">
          <Text size="xl" fw={700}>
            {workEntryEditingId !== null ? "Edit Work Entry" : "Add Work Entry"}
          </Text>
          {workEntryEditingId !== null && (
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
          {workEntryEditingId !== null ? "Update" : "Save"}
        </Button>
      </Stack>
    </Modal>
  );
}
