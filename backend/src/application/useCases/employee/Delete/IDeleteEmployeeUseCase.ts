import type { Request } from "express";

export interface IDeleteEmployeeUseCase {
  Execute(req: Request): Promise<void>;
}
