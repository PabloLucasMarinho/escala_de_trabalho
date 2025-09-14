import type { IEntityBase } from "./IEntityBase.js";

export interface IUser extends IEntityBase {
  name: string;
  email: string;
  password: string;
}
