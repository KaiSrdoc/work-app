"use client";

import { Button, Container, Title } from "@mantine/core";
import { Group } from "@mantine/core";
import { TaskForm } from "./ui/task-form";
import { TaskTable } from "./ui/task-table";
import { useWorkStore } from "@/app/work.store";

export default function Tasks() {
  const { openTaskForm } = useWorkStore();

  return (
    <Container size="lg" pt="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title>Tasks</Title>
        <Button onClick={() => openTaskForm()}>Add Task</Button>
      </Group>
      <TaskForm />
      <TaskTable />
    </Container>
  );
}
