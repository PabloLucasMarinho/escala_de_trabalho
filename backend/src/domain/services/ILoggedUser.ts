import type IUser from "../../infrastructure/entities/IUser.js";

export default interface ILoggedUser {
  User(): Promise<IUser>;
}
