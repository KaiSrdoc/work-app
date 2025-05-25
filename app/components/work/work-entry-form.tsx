import {
  Modal,
  TextInput,
  NumberInput,
  Stack,
  Button,
  Select,
  Text,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useWorkStore } from "../../work.store";
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

  const [date, setDate] = useState("");
  const [hoursWorked, setHoursWorked] = useState<number | "">(0);
  const [moneyEarned, setMoneyEarned] = useState<number | "">(0);
  const [goalId, setGoalId] = useState<string>("");

  useEffect(() => {
    if (workEntryEditingIndex !== null) {
      const entry = workEntries[workEntryEditingIndex];
      setDate(entry.date);
      setHoursWorked(entry.hoursWorked);
      setMoneyEarned(entry.moneyEarned);
      setGoalId(entry.goalId);
    } else {
      setDate("");
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
        date,
        hoursWorked: Number(hoursWorked),
        moneyEarned: Number(moneyEarned),
        goalId,
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
        <TextInput
          label="Date"
          placeholder="e.g., Fri 23.5."
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
