import type { Types } from "mongoose";

export interface IRegisterWorkplaceDTO {
  name: string;
  adm?: Types.ObjectId;
}
