import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Goal, WorkEntry, Project } from "@/libs/supabase/entities.types";

interface WorkStore {
  goalEditingId: Goal["id"] | null;
  isGoalFormOpen: boolean;
  openGoalForm: (editingId?: Goal["id"]) => void;
  closeGoalForm: () => void;
  workEntryEditingId: WorkEntry["id"] | null;
  isEntryFormOpen: boolean;
  openEntryForm: (editingId?: WorkEntry["id"]) => void;
  closeEntryForm: () => void;
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
      workEntryEditingId: null,
      isEntryFormOpen: false,
      openEntryForm: (editingId) =>
        set({
          isEntryFormOpen: true,
          workEntryEditingId: editingId ?? null,
        }),
      closeEntryForm: () =>
        set({
          isEntryFormOpen: false,
          workEntryEditingId: null,
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
