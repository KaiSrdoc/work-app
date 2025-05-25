import { Modal, TextInput, NumberInput, Stack, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useWorkStore } from "../work.store";

export function WorkEntryForm() {
  const {
    workEntries,
    addWorkEntry,
    updateWorkEntry,
    isEntryFormOpen,
    workEntryEditingIndex,
    closeEntryForm,
  } = useWorkStore();

  const [date, setDate] = useState("");
  const [hoursWorked, setHoursWorked] = useState<number | "">(0);
  const [moneyEarned, setMoneyEarned] = useState<number | "">(0);

  useEffect(() => {
    if (workEntryEditingIndex !== null) {
      const entry = workEntries[workEntryEditingIndex];
      setDate(entry.date);
      setHoursWorked(entry.hoursWorked);
      setMoneyEarned(entry.moneyEarned);
    } else {
      setDate("");
      setHoursWorked(0);
      setMoneyEarned(0);
    }
  }, [workEntryEditingIndex, workEntries]);

  useEffect(() => {
    if (hoursWorked !== "") {
      setMoneyEarned(Number(hoursWorked) * 50);
    }
  }, [hoursWorked]);

  const handleSubmit = () => {
    if (date && hoursWorked && moneyEarned) {
      const entry = {
        date,
        hoursWorked: Number(hoursWorked),
        moneyEarned: Number(moneyEarned),
      };

      if (workEntryEditingIndex !== null) {
        updateWorkEntry(workEntryEditingIndex, entry);
      } else {
        addWorkEntry(entry);
      }
      closeEntryForm();
    }
  };

  return (
    <Modal
      opened={isEntryFormOpen}
      onClose={closeEntryForm}
      title={
        workEntryEditingIndex !== null ? "Edit Work Entry" : "Add Work Entry"
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
        <Button onClick={handleSubmit}>
          {workEntryEditingIndex !== null ? "Update" : "Save"}
        </Button>
      </Stack>
    </Modal>
  );
}
