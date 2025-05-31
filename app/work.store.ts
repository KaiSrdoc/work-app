import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Goal, WorkEntry } from "@/libs/supabase/entities.types";

interface WorkStore {
  goalEditingId: Goal["id"] | null;
  isGoalFormOpen: boolean;
  openGoalForm: (editingId?: Goal["id"]) => void;
  closeGoalForm: () => void;
  workEntryEditingId: WorkEntry["id"] | null;
  isEntryFormOpen: boolean;
  openEntryForm: (editingId?: WorkEntry["id"]) => void;
  closeEntryForm: () => void;
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
    }),
    {
      name: "work-storage",
    }
  )
);
