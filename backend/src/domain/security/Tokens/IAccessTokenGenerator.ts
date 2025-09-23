import type { Types } from "mongoose";

export default interface IAccessTokenGenerator {
  Generate(userId: Types.ObjectId): string;
}
