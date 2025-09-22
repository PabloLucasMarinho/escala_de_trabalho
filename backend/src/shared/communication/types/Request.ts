import type { Request } from "express";

export type InputData<T> = Request<unknown, unknown, T>;
