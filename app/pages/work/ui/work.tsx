import { Button, Title } from "@mantine/core";
import { Group } from "@mantine/core";
import { WorkEntryForm } from "./work-entry-form";
import { WorkEntriesTable } from "./work-entries-table";
import { useWorkStore } from "@/app/work.store";

export default function Work() {
  const { openEntryForm } = useWorkStore();

  return (
    <div>
      <Group justify="space-between" align="center" mt="xl" mb="md">
        <Title order={2}>Work</Title>
        <Button onClick={() => openEntryForm()}>Add Work</Button>
      </Group>
      <WorkEntryForm />
      <WorkEntriesTable />
    </div>
  );
}
