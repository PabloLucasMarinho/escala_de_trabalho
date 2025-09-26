import type { Types } from "mongoose";

export default interface ResponseShiftJson {
  dateInit: Date;
  dateEnd: Date;
  weekday: string;
  frequency: string;
  workplace: Types.ObjectId;
  employee: Types.ObjectId;
}
