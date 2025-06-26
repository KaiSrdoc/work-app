"use client";

import { Table, Badge } from "@mantine/core";
import { useGetTasks } from "../api/use-get-tasks";
import { useGetProjects } from "@/app/(pages)/projects/api/use-get-projects";
import { useGetUsers } from "@/app/(pages)/users/api/use-get-users";
import { TaskStatus } from "@/libs/supabase/entities.types";

const statusColorMap: Record<TaskStatus, string> = {
  todo: "blue",
  in_progress: "yellow",
  done: "green",
};

export function TaskTable() {
  const { data: tasks = [], isLoading: isLoadingTasks } = useGetTasks();
  const { data: projects = [], isLoading: isLoadingProjects } =
    useGetProjects();
  const { data: users = [], isLoading: isLoadingUsers } = useGetUsers();

  if (isLoadingTasks || isLoadingProjects || isLoadingUsers) {
    return <div>Loading...</div>;
  }

  const getProjectName = (projectId: number | null | undefined) => {
    if (!projectId) return "-";
    const project = projects.find((p) => p.id === projectId);
    return project?.title || "-";
  };

  const getOwnerNames = (ownerIds: number[] | null | undefined) => {
    if (!ownerIds?.length) return "-";
    return ownerIds
      .map((id) => {
        const user = users.find((u) => u.id === id);
        return user?.name || "-";
      })
      .join(", ");
  };

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Project</Table.Th>
          <Table.Th>Owners</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {tasks.map((task) => (
          <Table.Tr key={task.id}>
            <Table.Td>{task.title}</Table.Td>
            <Table.Td>{task.description}</Table.Td>
            <Table.Td>
              <Badge color={statusColorMap[task.status]}>{task.status}</Badge>
            </Table.Td>
            <Table.Td>{getProjectName(task.project_id)}</Table.Td>
            <Table.Td>{getOwnerNames(task.owner_ids)}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
