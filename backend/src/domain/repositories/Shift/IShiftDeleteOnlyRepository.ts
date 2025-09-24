import type IShift from "../../../infrastructure/entities/IShift.js";

export default interface IShiftDeleteOnlyRepository {
  Delete(shift: IShift): Promise<void>;
}
