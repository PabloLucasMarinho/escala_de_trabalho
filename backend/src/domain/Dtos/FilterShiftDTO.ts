import type { Types } from "mongoose";

export default interface FilterShiftDTO {
  weekday?: string | undefined;
  frequency?: string | undefined;
  workplace?: Types.ObjectId | undefined;
  employee?: Types.ObjectId | undefined;
}
