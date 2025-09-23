import type IWorkplace from "../../../infrastructure/entities/IWorkplace.js";

export default interface IWorkplaceDeleteOnlyRepository {
  Delete(workplace: IWorkplace): Promise<void>;
}
