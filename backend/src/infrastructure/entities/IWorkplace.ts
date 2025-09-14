import type { Types } from "mongoose";
import type { IEntityBase } from "./IEntityBase.js";

export interface IWorkplace extends IEntityBase {
  name: string;
  adm: Types.ObjectId;
}
