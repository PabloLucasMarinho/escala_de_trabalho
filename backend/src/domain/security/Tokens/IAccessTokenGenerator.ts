import type { Types } from "mongoose";

export interface IAccessTokenGenerator {
  Generate(userId: Types.ObjectId): string;
}
