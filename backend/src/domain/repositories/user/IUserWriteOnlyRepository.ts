import type { Types } from "mongoose";
import type IUser from "../../../infrastructure/entities/IUser.js";

export default interface IUserWriteOnlyRepository {
  Add(user: IUser): Promise<Types.ObjectId>;
}
