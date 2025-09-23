import type { Types } from "mongoose";

export default interface IEntityBase {
  _id?: Types.ObjectId;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
