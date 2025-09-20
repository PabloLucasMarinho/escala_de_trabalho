import type { Request } from "express";

export interface IUpdateUserUseCase {
  Execute(req: Request): Promise<void>;
}
