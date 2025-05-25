"use client";

import { Container, Group, Title, Button } from "@mantine/core";
import { useWorkStore } from "./work.store";
import { WorkEntryForm } from "./components/work-entry-form";
import { WorkEntriesTable } from "./components/work-entries-table";
import { TuitionProgress } from "./components/tuition-progress";

export default function Home() {
  const { openEntryForm } = useWorkStore();

  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="left" mb="xl">
        Kai&apos;s Work
      </Title>

      <TuitionProgress />

      <Group justify="space-between" align="center" mt="xl" mb="md">
        <Title order={2}>Work</Title>
        <Button onClick={() => openEntryForm()}>Add Work</Button>
      </Group>

      <WorkEntryForm />
      <WorkEntriesTable />
    </Container>
  );
}
