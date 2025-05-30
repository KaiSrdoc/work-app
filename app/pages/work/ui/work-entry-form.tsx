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

export function WorkEntryForm() {
  const {
    workEntries,
    goals,
    addWorkEntry,
    updateWorkEntry,
    deleteWorkEntry,
    isEntryFormOpen,
    workEntryEditingIndex,
    closeEntryForm,
  } = useWorkStore();

  const [date, setDate] = useState<Date | null>(null);
  const [hoursWorked, setHoursWorked] = useState<number | "">(0);
  const [moneyEarned, setMoneyEarned] = useState<number | "">(0);
  const [goalId, setGoalId] = useState<string>("");

  useEffect(() => {
    if (workEntryEditingIndex !== null) {
      const entry = workEntries[workEntryEditingIndex];
      setDate(entry.date ? new Date(entry.date) : null);
      setHoursWorked(entry.hours_worked);
      setMoneyEarned(entry.money_earned);
      setGoalId(entry.goal_id);
    } else {
      setDate(null);
      setHoursWorked(0);
      setMoneyEarned(0);
      setGoalId(goals[0]?.id || "");
    }
  }, [workEntryEditingIndex, workEntries, goals]);

  useEffect(() => {
    if (hoursWorked !== "") {
      setMoneyEarned(Number(hoursWorked) * 50);
    }
  }, [hoursWorked]);

  const handleSubmit = () => {
    if (date && hoursWorked && moneyEarned && goalId) {
      const entry = {
        date: date.toISOString().split("T")[0],
        hours_worked: Number(hoursWorked),
        money_earned: Number(moneyEarned),
        goal_id: goalId,
        user_id: "1",
      };

      if (workEntryEditingIndex !== null) {
        updateWorkEntry(workEntryEditingIndex, entry);
      } else {
        addWorkEntry(entry);
      }
      closeEntryForm();
    }
  };

  const handleDelete = () => {
    if (workEntryEditingIndex !== null) {
      deleteWorkEntry(workEntryEditingIndex);
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
            {workEntryEditingIndex !== null
              ? "Edit Work Entry"
              : "Add Work Entry"}
          </Text>
          {workEntryEditingIndex !== null && (
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
          value={goalId}
          onChange={(value) => setGoalId(value || "")}
          data={goals.map((goal) => ({ value: goal.id, label: goal.title }))}
        />
        <Button onClick={handleSubmit}>
          {workEntryEditingIndex !== null ? "Update" : "Save"}
        </Button>
      </Stack>
    </Modal>
  );
}
