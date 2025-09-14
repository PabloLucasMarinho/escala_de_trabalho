import type { Types } from "mongoose";
import type { IEntityBase } from "./IEntityBase.js";

export interface IShift extends IEntityBase {
  effectiveDate: Date;
  terminationDate: Date;
  shiftStart: string;
  shiftEnd: string;
  weekday: string;
  frequency: string;
  workplace: Types.ObjectId;
  employee: Types.ObjectId;
}
