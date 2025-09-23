import type { Request } from "express";

interface ParamsDictionary {
  [key: string]: string;
}

export type InputData<T> = Request<ParamsDictionary, any, T>;
