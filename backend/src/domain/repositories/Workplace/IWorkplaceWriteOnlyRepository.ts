import type IWorkplace from "../../../infrastructure/entities/IWorkplace.js";

export default interface IWorkplaceWriteOnlyRepository {
  Add(workplace: IWorkplace): Promise<IWorkplace>;
}
