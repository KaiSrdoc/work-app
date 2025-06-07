"use client";

import { Button, Container, Group, Stack, Title } from "@mantine/core";
import { useWorkStore } from "@/app/work.store";
import { ProjectCard } from "./ui/project-card";
import { ProjectForm } from "./ui/project-form";
import { useGetProjects } from "@/app/(pages)/projects/api/use-get-projects";

export default function Projects() {
  const { openProjectForm } = useWorkStore();
  const { data: projects } = useGetProjects();

  return (
    <Container size="lg" pt="xl">
      <Stack gap="0">
        <Group justify="space-between" align="center" mb="xl">
          <Title>Projects</Title>
          <Button onClick={() => openProjectForm()}>Add Project</Button>
        </Group>
        <Stack>
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <ProjectForm />
        </Stack>
      </Stack>
    </Container>
  );
}
