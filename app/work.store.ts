import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Goal {
  id: string;
  title: string;
  total: number;
  user_id: string;
}

interface WorkEntry {
  date: string;
  hours_worked: number;
  money_earned: number;
  goal_id: string;
  user_id: string;
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

const initialGoals: Goal[] = [];

const initialWorkEntries: WorkEntry[] = [
  {
    date: "2025-05-23",
    hours_worked: 4,
    money_earned: 200,
    goal_id: "tuition-1-2",
    user_id: "1",
  },
  {
    date: "2025-05-24",
    hours_worked: 4,
    money_earned: 200,
    goal_id: "tuition-1-2",
    user_id: "1",
  },
  {
    date: "2025-05-25",
    hours_worked: 8,
    money_earned: 400,
    goal_id: "tuition-1-2",
    user_id: "1",
  },
  {
    date: "2025-05-27",
    hours_worked: 2,
    money_earned: 100,
    goal_id: "tuition-1-2",
    user_id: "1",
  },
  {
    date: "2025-05-28",
    hours_worked: 3,
    money_earned: 150,
    goal_id: "tuition-1-2",
    user_id: "1",
  },
];

export const useWorkStore = create<WorkStore>()(
  persist(
    (set) => ({
      workEntries: initialWorkEntries,
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
      goals: initialGoals,
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
