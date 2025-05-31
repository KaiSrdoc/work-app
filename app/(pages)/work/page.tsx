"use client";

import { Button, Container, Title } from "@mantine/core";
import { Group } from "@mantine/core";
import { WorkEntryForm } from "./ui/work-entry-form";
import { WorkEntriesTable } from "./ui/work-entries-table";
import { useWorkStore } from "@/app/work.store";

export default function Work() {
  const { openEntryForm } = useWorkStore();

  return (
    <Container size="lg" pt="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title>Work</Title>
        <Button onClick={() => openEntryForm()}>Add Work</Button>
      </Group>
      <WorkEntryForm />
      <WorkEntriesTable />
    </Container>
  );
}
