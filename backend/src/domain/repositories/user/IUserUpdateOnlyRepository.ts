import type { IUser } from "../../../infrastructure/entities/IUser.js";

export interface IUserUpdateOnlyRepository {
  GetById(id: string): Promise<IUser>;

  Update(user: Partial<IUser>, id: string): Promise<void>;
}
