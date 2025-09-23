import type IUser from "../../../infrastructure/entities/IUser.js";
import type IWorkplace from "../../../infrastructure/entities/IWorkplace.js";

export default interface IWorkplaceReadOnlyRepository {
  ExistActiveWorkplaceWithName(name: string): Promise<boolean>;
  GetById(user: IUser, workplaceId: string): Promise<IWorkplace | null>;
}
