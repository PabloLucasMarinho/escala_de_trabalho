import type { Types } from "mongoose";

export interface IEmployee {
  _id?: Types.ObjectId;
  name: string;
  adm: Types.ObjectId;
  shift?: Types.ObjectId;
  dates?: Array<Date>;
  local?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
