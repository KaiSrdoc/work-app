import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Goal {
  id: number;
  title: string;
  total: number;
  user_id: number;
}

export interface WorkEntry {
  id: number;
  date: string;
  hours_worked: number;
  money_earned: number;
  goal_id: number;
  user_id: number;
}

interface WorkStore {
  workEntries: WorkEntry[];
  addWorkEntry: (entry: WorkEntry) => void;
  updateWorkEntry: (id: number, entry: WorkEntry) => void;
  deleteWorkEntry: (id: number) => void;
  workEntryEditingId: number | null;
  isEntryFormOpen: boolean;
  openEntryForm: (editingId?: number) => void;
  closeEntryForm: () => void;
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (id: number, goal: Goal) => void;
  deleteGoal: (id: number) => void;
  goalEditingId: number | null;
  isGoalFormOpen: boolean;
  openGoalForm: (editingId?: number) => void;
  closeGoalForm: () => void;
}

export const useWorkStore = create<WorkStore>()(
  persist(
    (set) => ({
      workEntries: [],
      addWorkEntry: (entry) =>
        set((state) => ({
          workEntries: [...state.workEntries, entry],
        })),
      updateWorkEntry: (id, entry) =>
        set((state) => ({
          workEntries: state.workEntries.map((e) => (e.id === id ? entry : e)),
        })),
      deleteWorkEntry: (id) =>
        set((state) => ({
          workEntries: state.workEntries.filter((e) => e.id !== id),
        })),
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
      goals: [],
      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, goal],
        })),
      updateGoal: (id, goal) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? goal : g)),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
          workEntries: state.workEntries.filter((e) => e.goal_id !== id),
        })),
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
    }),
    {
      name: "work-storage",
    }
  )
);
