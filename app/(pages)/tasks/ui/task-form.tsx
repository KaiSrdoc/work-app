"use client";

import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useWorkStore } from "@/app/work.store";
import { useCallback, useEffect } from "react";
import { useGetTasks } from "../api/use-get-tasks";
import { useUpsertTask } from "../api/use-upsert-task";

interface TaskFormValues {
  title: string;
  description: string;
}

export function TaskForm() {
  const { isTaskFormOpen, taskEditingId, closeTaskForm } = useWorkStore();
  const { data: tasks = [] } = useGetTasks();
  const upsertTask = useUpsertTask();

  const form = useForm<TaskFormValues>({
    initialValues: {
      title: "",
      description: "",
    },
  });

  const loadTask = useCallback(() => {
    if (!taskEditingId) return;

    const task = tasks.find((t) => t.id === taskEditingId);
    if (task) {
      form.setValues({
        title: task.title,
        description: task.description || "",
      });
    }
  }, [taskEditingId, tasks, form]);

  useEffect(() => {
    if (isTaskFormOpen) {
      if (taskEditingId) {
        loadTask();
      } else {
        form.reset();
      }
    }
  }, [isTaskFormOpen, taskEditingId, loadTask, form]);

  const handleSubmit = async (values: TaskFormValues) => {
    await upsertTask.mutateAsync({
      ...values,
      id: taskEditingId || undefined,
    });
    closeTaskForm();
  };

  return (
    <Modal
      opened={isTaskFormOpen}
      onClose={closeTaskForm}
      title={taskEditingId ? "Edit Task" : "New Task"}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter task title"
          required
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Description"
          placeholder="Enter task description"
          mt="md"
          {...form.getInputProps("description")}
        />
        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={closeTaskForm}>
            Cancel
          </Button>
          <Button type="submit" loading={upsertTask.isPending}>
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
