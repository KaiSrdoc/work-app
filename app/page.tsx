"use client";

import {
  Title,
  Container,
  Progress,
  Text,
  Group,
  Table,
  Button,
  Modal,
  TextInput,
  NumberInput,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { useWorkStore } from "./work-store";
import { useState, useEffect } from "react";
import { IconEdit } from "@tabler/icons-react";

export default function Home() {
  const { workEntries, addWorkEntry, updateWorkEntry } = useWorkStore();
  const totalMoneyEarned = workEntries.reduce(
    (sum, entry) => sum + entry.moneyEarned,
    0
  );
  const totalTuition = 2000;
  const tuitionPercentage = (totalMoneyEarned / totalTuition) * 100;
  const [opened, setOpened] = useState(false);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState<number | "">(0);
  const [moneyEarned, setMoneyEarned] = useState<number | "">(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hours !== "") {
      setMoneyEarned(Number(hours) * 50);
    }
  }, [hours]);

  const handleSubmit = () => {
    if (date && hours && moneyEarned) {
      const entry = {
        date,
        hours: Number(hours),
        moneyEarned: Number(moneyEarned),
      };

      if (editingIndex !== null) {
        updateWorkEntry(editingIndex, entry);
      } else {
        addWorkEntry(entry);
      }

      setOpened(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setDate("");
    setHours(0);
    setMoneyEarned(0);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    const entry = workEntries[index];
    setDate(entry.date);
    setHours(entry.hours);
    setMoneyEarned(entry.moneyEarned);
    setEditingIndex(index);
    setOpened(true);
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="left" mb="xl">
        Kai&apos;s Tuition
      </Title>
      <Progress
        color="yellow"
        size="xl"
        value={tuitionPercentage}
        striped
        mb="xs"
      />
      <Group justify="space-between">
        <Text size="sm">0</Text>
        <Text size="sm">500</Text>
        <Text size="sm">1000</Text>
        <Text size="sm">1500</Text>
        <Text size="sm">2000</Text>
      </Group>

      <Group justify="space-between" align="center" mt="xl" mb="md">
        <Title order={2}>Work</Title>
        <Button
          onClick={() => {
            resetForm();
            setOpened(true);
          }}
        >
          Add Work
        </Button>
      </Group>

      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          resetForm();
        }}
        title={editingIndex !== null ? "Edit Work Entry" : "Add Work Entry"}
      >
        <Stack>
          <TextInput
            label="Date"
            placeholder="e.g., Fri 23.5."
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <NumberInput
            label="Hours"
            placeholder="Enter hours"
            value={hours}
            onChange={(val) => setHours(val as number | "")}
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
            {editingIndex !== null ? "Update" : "Save"}
          </Button>
        </Stack>
      </Modal>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Hours</Table.Th>
            <Table.Th>Money Earned</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {workEntries.map((entry, index) => (
            <Table.Tr key={index}>
              <Table.Td>{entry.date}</Table.Td>
              <Table.Td>{entry.hours}</Table.Td>
              <Table.Td>{entry.moneyEarned}€</Table.Td>
              <Table.Td>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => handleEdit(index)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}
