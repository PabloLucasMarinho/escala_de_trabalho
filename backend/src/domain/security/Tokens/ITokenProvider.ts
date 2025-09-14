import type { Request } from "express";

export interface ITokenProvider {
  Value(): string;
}
