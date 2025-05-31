import { Tables } from "./database.types";

export type UserDb = Tables<"users">;
export type GoalDb = Tables<"goals">;
export type WorkEntryDb = Tables<"work_entries">;

export type User = Transform<UserDb> & { avatar: string };
export type Goal = Transform<GoalDb>;
export type WorkEntry = Transform<WorkEntryDb>;

type Transform<T> = NullToUndefined<T>;

type NullToUndefined<T> = T extends null
  ? undefined
  : T extends object
  ? { [K in keyof T]: NullToUndefined<T[K]> }
  : T;
