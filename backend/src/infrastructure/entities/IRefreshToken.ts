import type { Types } from "mongoose";
import type IEntityBase from "./IEntityBase.js";

export default interface IRefreshToken extends IEntityBase {
  value: string;
  userId: Types.ObjectId;
}
