import type { Request } from "express";

export interface IChangePasswordUseCase {
  Execute(req: Request): Promise<void>;
}
