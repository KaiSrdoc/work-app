import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkEntry {
  date: string;
  hours: number;
  moneyEarned: number;
}

interface WorkStore {
  workEntries: WorkEntry[];
  addWorkEntry: (entry: WorkEntry) => void;
  updateWorkEntry: (index: number, entry: WorkEntry) => void;
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
    }),
    {
      name: "work-storage",
    }
  )
);
