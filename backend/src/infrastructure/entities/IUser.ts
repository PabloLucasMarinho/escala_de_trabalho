import type IEntityBase from "./IEntityBase.js";

export default interface IUser extends IEntityBase {
  name: string;
  email: string;
  password: string;
}
