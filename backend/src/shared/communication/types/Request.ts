import type { Request } from "express";

export interface ParamsDictionary {
  [key: string]: string;
}

export type InputData<T> = Request<ParamsDictionary, any, T>;
