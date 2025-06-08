import { Tables } from "./database.types";

export enum TableName {
  GOALS = "goals",
  PROJECTS = "projects",
  TASKS = "tasks",
  USERS = "users",
  WORK = "work",
}

export type GoalDb = Tables<TableName.GOALS>;
export type ProjectDb = Tables<TableName.PROJECTS>;
export type TaskDb = Tables<TableName.TASKS>;
export type UserDb = Tables<TableName.USERS>;
export type WorkDb = Tables<TableName.WORK>;

export type Goal = Transform<GoalDb>;
export type Project = Transform<ProjectDb>;
export type Task = Transform<TaskDb>;
export type User = Transform<UserDb> & { avatar: string };
export type Work = Transform<WorkDb>;

type Transform<T> = NullToUndefined<T>;

type NullToUndefined<T> = T extends null
  ? undefined
  : T extends object
  ? { [K in keyof T]: NullToUndefined<T[K]> }
  : T;
