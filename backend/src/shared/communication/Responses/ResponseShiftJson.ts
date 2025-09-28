import type { Types } from "mongoose";
import mongoose from "mongoose";

export default class ResponseShiftJson {
  id: Types.ObjectId = new mongoose.Types.ObjectId();
  dateInit: Date = new Date();
  dateEnd: Date = new Date();
  weekday: string = String();
  frequency: string = String();
  workplace: Types.ObjectId = new mongoose.Types.ObjectId();
  employee: Types.ObjectId = new mongoose.Types.ObjectId();
}
