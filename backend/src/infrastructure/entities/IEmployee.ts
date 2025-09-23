import type { Types } from "mongoose";
import type IEntityBase from "./IEntityBase.js";

export default interface IEmployee extends IEntityBase {
  name: string;
  adm?: Types.ObjectId;
  shift?: Types.ObjectId;
}
