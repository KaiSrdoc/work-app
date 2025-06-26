"use client";

import {
  Button,
  Group,
  Modal,
  Select,
  TextInput,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useWorkStore } from "@/app/work.store";
import { useCallback, useEffect } from "react";
import { useGetTasks } from "../api/use-get-tasks";
import { useUpsertTask } from "../api/use-upsert-task";
import { useGetProjects } from "@/app/(pages)/projects/api/use-get-projects";
import { useGetUsers } from "@/app/(pages)/users/api/use-get-users";
import { TaskStatus } from "@/libs/supabase/entities.types";

interface TaskFormValues {
  title: string;
  description: string;
  status: TaskStatus;
  project_id: string | null;
  owner_ids: string[];
}

export function TaskForm() {
  const { isTaskFormOpen, taskEditingId, closeTaskForm } = useWorkStore();
  const { data: tasks = [] } = useGetTasks();
  const { data: projects = [] } = useGetProjects();
  const { data: users = [] } = useGetUsers();
  const upsertTask = useUpsertTask();

  const form = useForm<TaskFormValues>({
    initialValues: {
      title: "",
      description: "",
      status: "todo",
      project_id: null,
      owner_ids: [],
    },
  });

  const loadTask = useCallback(() => {
    if (!taskEditingId) return;

    const task = tasks.find((t) => t.id === taskEditingId);
    if (task) {
      form.setValues({
        title: task.title,
        description: task.description || "",
        status: task.status,
        project_id: task.project_id?.toString() || null,
        owner_ids: (task.owner_ids || []).map((id) => id.toString()),
      });
    }
  }, [taskEditingId, tasks]);

  useEffect(() => {
    if (isTaskFormOpen) {
      if (taskEditingId) {
        loadTask();
      } else {
        form.reset();
      }
    }
  }, [isTaskFormOpen, taskEditingId, loadTask]);

  const handleSubmit = async (values: TaskFormValues) => {
    await upsertTask.mutateAsync({
      ...values,
      project_id: values.project_id ? Number(values.project_id) : null,
      owner_ids: values.owner_ids.map((id) => Number(id)),
      id: taskEditingId || undefined,
    });
    form.reset();
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
        <Select
          label="Status"
          placeholder="Select task status"
          required
          mt="md"
          {...form.getInputProps("status")}
          data={[
            { value: "todo", label: "Todo" },
            { value: "in_progress", label: "In Progress" },
            { value: "done", label: "Done" },
          ]}
        />
        <Select
          label="Project"
          placeholder="Select a project"
          mt="md"
          clearable
          required
          {...form.getInputProps("project_id")}
          data={projects.map((project) => ({
            value: project.id.toString(),
            label: project.title || "",
          }))}
        />
        <MultiSelect
          label="Owners"
          placeholder="Select task owners"
          mt="md"
          required
          {...form.getInputProps("owner_ids")}
          data={users.map((user) => ({
            value: user.id.toString(),
            label: user.name || user.email || "",
          }))}
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
