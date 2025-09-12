import type { Types } from "mongoose";

export interface IWorkplace {
  _id?: Types.ObjectId;
  name: string;
  adm: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
