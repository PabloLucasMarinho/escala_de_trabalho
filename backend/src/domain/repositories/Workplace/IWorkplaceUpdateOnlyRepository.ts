import type IWorkplace from "../../../infrastructure/entities/IWorkplace.js";

export default interface IWorkplaceUpdateOnlyRepository {
  Update(workplace: IWorkplace): Promise<void>;
}
