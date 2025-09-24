import type IShift from "../../../infrastructure/entities/IShift.js";

export default interface IShiftReadOnlyRepository {
  GetById(shitId: string): Promise<IShift | null>;
}
