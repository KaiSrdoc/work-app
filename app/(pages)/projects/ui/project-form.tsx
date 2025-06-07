import {
  Modal,
  TextInput,
  Textarea,
  Stack,
  Button,
  Text,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useWorkStore } from "@/app/work.store";
import { useUpsertProject } from "../api/use-upsert-project";
import { useGetProjects } from "../api/use-get-projects";
import { useDeleteProject } from "../api/use-delete-project";

export function ProjectForm() {
  const { isProjectFormOpen, projectEditingId, closeProjectForm } =
    useWorkStore();
  const { data: projects = [] } = useGetProjects();
  const { mutate: upsertProject } = useUpsertProject();
  const { mutate: deleteProject } = useDeleteProject();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (projectEditingId !== null) {
      const project = projects.find((p) => p.id === projectEditingId);
      if (project) {
        setTitle(project.title || "");
        setDescription(project.description || "");
      }
    } else {
      setTitle("");
      setDescription("");
    }
  }, [projectEditingId, projects]);

  const handleSubmit = () => {
    if (title) {
      const project = {
        title,
        description,
      };
      upsertProject(project);
      closeProjectForm();
    }
  };

  const handleDelete = () => {
    if (projectEditingId) {
      deleteProject(projectEditingId);
      closeProjectForm();
    }
  };

  return (
    <Modal
      opened={isProjectFormOpen}
      onClose={closeProjectForm}
      title={
        <Group justify="space-between" align="center">
          <Text size="xl" fw={700}>
            {projectEditingId !== null ? "Edit Project" : "Add Project"}
          </Text>
          {projectEditingId && (
            <Tooltip label="Delete project">
              <ActionIcon variant="subtle" color="red" onClick={handleDelete}>
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      }
    >
      <Stack>
        <TextInput
          label="Title"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          label="Description"
          placeholder="Enter project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={!title}>
          {projectEditingId !== null ? "Update" : "Save"}
        </Button>
      </Stack>
    </Modal>
  );
}
