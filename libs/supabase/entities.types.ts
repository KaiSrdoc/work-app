import { Tables } from "./database.types";

export enum TableName {
  WORK = "work",
  GOAL = "goals",
  PROJECT = "projects",
  USER = "users",
}

export type UserDb = Tables<TableName.USER>;
export type GoalDb = Tables<TableName.GOAL>;
export type WorkDb = Tables<TableName.WORK>;
export type ProjectDb = Tables<TableName.PROJECT>;

export type User = Transform<UserDb> & { avatar: string };
export type Goal = Transform<GoalDb>;
export type Work = Transform<WorkDb>;
export type Project = Transform<ProjectDb>;

type Transform<T> = NullToUndefined<T>;

type NullToUndefined<T> = T extends null
  ? undefined
  : T extends object
  ? { [K in keyof T]: NullToUndefined<T[K]> }
  : T;
