import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Goal {
  id: string;
  title: string;
  total: number;
}

interface WorkEntry {
  date: string;
  hoursWorked: number;
  moneyEarned: number;
  goalId: string;
}

interface WorkStore {
  workEntries: WorkEntry[];
  addWorkEntry: (entry: WorkEntry) => void;
  updateWorkEntry: (index: number, entry: WorkEntry) => void;
  deleteWorkEntry: (index: number) => void;
  workEntryEditingIndex: number | null;
  isEntryFormOpen: boolean;
  openEntryForm: (editingIndex?: number) => void;
  closeEntryForm: () => void;
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, goal: Goal) => void;
  deleteGoal: (id: string) => void;
  goalEditingId: string | null;
  isGoalFormOpen: boolean;
  openGoalForm: (editingId?: string) => void;
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
      updateWorkEntry: (index, entry) =>
        set((state) => ({
          workEntries: state.workEntries.map((e, i) =>
            i === index ? entry : e
          ),
        })),
      deleteWorkEntry: (index) =>
        set((state) => ({
          workEntries: state.workEntries.filter((_, i) => i !== index),
        })),
      workEntryEditingIndex: null,
      isEntryFormOpen: false,
      openEntryForm: (editingIndex) =>
        set({
          isEntryFormOpen: true,
          workEntryEditingIndex: editingIndex ?? null,
        }),
      closeEntryForm: () =>
        set({
          isEntryFormOpen: false,
          workEntryEditingIndex: null,
        }),
      goals: [
        { id: "tuition", title: "Tuition", total: 2000 },
        { id: "savings", title: "Savings", total: 5000 },
      ],
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
          workEntries: state.workEntries.filter((e) => e.goalId !== id),
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
