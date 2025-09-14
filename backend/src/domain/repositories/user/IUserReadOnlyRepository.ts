import type { IUser } from "../../../infrastructure/entities/IUser.js";

export interface IUserReadOnlyRepository {
  ExistActiveUserWithEmail(email: string): Promise<boolean>;

  ExistActiveUserWithId(id: string): Promise<boolean>;

  GetByEmail(email: string): Promise<IUser>;
}
