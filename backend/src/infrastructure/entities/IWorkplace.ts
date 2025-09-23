import type { Types } from "mongoose";
import type IEntityBase from "./IEntityBase.js";

export default interface IWorkplace extends IEntityBase {
  name: string;
  adm?: Types.ObjectId;
}
