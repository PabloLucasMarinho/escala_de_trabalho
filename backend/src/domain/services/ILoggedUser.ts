import type { IUser } from "../../infrastructure/entities/IUser.js";

export interface ILoggedUser {
  User(): Promise<IUser>;
}
