import type IUser from "../../../infrastructure/entities/IUser.js";
import type IWorkplace from "../../../infrastructure/entities/IWorkplace.js";

export default interface IWorkplaceReadOnlyRepository {
  ExistActiveWorkplaceWithName(name: string): Promise<boolean>;
  GetById(workplaceId: string): Promise<IWorkplace | null>;
  GetAll(): Promise<IWorkplace[] | null>;
}
