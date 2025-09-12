import type { Types } from "mongoose";

export interface IShift {
  _id?: Types.ObjectId;
  effectiveDate: Date;
  terminationDate: Date;
  shiftStart: string;
  shiftEnd: string;
  weekday: string;
  workplace: Types.ObjectId;
  employee: Types.ObjectId;
  createdAt?: Date;
  UpdatedAt?: Date;
}
