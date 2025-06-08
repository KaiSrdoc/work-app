"use client";

import { Button, Container, Title } from "@mantine/core";
import { Group } from "@mantine/core";
import { WorkForm } from "./ui/work-form";
import { WorkTable } from "./ui/work-table";
import { useWorkStore } from "@/app/work.store";

export default function Work() {
  const { openWorkForm } = useWorkStore();

  return (
    <Container size="lg" pt="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title>Work</Title>
        <Button onClick={() => openWorkForm()}>Add Work</Button>
      </Group>
      <WorkForm />
      <WorkTable />
    </Container>
  );
}
