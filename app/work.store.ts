import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkEntry {
  date: string;
  hoursWorked: number;
  moneyEarned: number;
}

interface WorkStore {
  workEntries: WorkEntry[];
  isEntryFormOpen: boolean;
  workEntryEditingIndex: number | null;
  addWorkEntry: (entry: WorkEntry) => void;
  updateWorkEntry: (index: number, entry: WorkEntry) => void;
  openEntryForm: (editingIndex?: number) => void;
  closeEntryForm: () => void;
}

export const useWorkStore = create<WorkStore>()(
  persist(
    (set) => ({
      workEntries: [],
      isEntryFormOpen: false,
      workEntryEditingIndex: null,
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
    }),
    {
      name: "work-storage",
    }
  )
);
