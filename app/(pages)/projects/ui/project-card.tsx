import { Card, Group, Stack, Text, Title, ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useWorkStore } from "@/app/work.store";
import { Project } from "@/libs/supabase/entities.types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { openProjectForm } = useWorkStore();

  return (
    <Card withBorder p="md" radius="md">
      <Stack gap="xs">
        <Group justify="space-between">
          <Group gap="xs" align="center">
            <Title order={3}>{project.title}</Title>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => openProjectForm(project.id)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Group>
        </Group>
        <Text size="sm" c="dimmed">
          {project.description}
        </Text>
      </Stack>
    </Card>
  );
}
