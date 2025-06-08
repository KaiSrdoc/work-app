import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Goal, Work, Project } from "@/libs/supabase/entities.types";

interface WorkStore {
  goalEditingId: Goal["id"] | null;
  isGoalFormOpen: boolean;
  openGoalForm: (editingId?: Goal["id"]) => void;
  closeGoalForm: () => void;
  workEditingId: Work["id"] | null;
  isWorkFormOpen: boolean;
  openWorkForm: (editingId?: Work["id"]) => void;
  closeWorkForm: () => void;
  projectEditingId: Project["id"] | null;
  isProjectFormOpen: boolean;
  openProjectForm: (editingId?: Project["id"]) => void;
  closeProjectForm: () => void;
}

export const useWorkStore = create<WorkStore>()(
  persist(
    (set) => ({
      goalEditingId: null,
      isGoalFormOpen: false,
      openGoalForm: (editingId) =>
        set({
          isGoalFormOpen: true,
          goalEditingId: editingId ?? null,
        }),
      closeGoalForm: () =>
        set({
          isGoalFormOpen: false,
          goalEditingId: null,
        }),
      workEditingId: null,
      isWorkFormOpen: false,
      openWorkForm: (editingId) =>
        set({
          isWorkFormOpen: true,
          workEditingId: editingId ?? null,
        }),
      closeWorkForm: () =>
        set({
          isWorkFormOpen: false,
          workEditingId: null,
        }),
      projectEditingId: null,
      isProjectFormOpen: false,
      openProjectForm: (editingId) =>
        set({
          isProjectFormOpen: true,
          projectEditingId: editingId ?? null,
        }),
      closeProjectForm: () =>
        set({
          isProjectFormOpen: false,
          projectEditingId: null,
        }),
    }),
    {
      name: "work-storage",
    }
  )
);
