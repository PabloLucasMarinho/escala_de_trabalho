import type IShift from "../../../infrastructure/entities/IShift.js";

export default interface IShiftUpdateOnlyRepository {
  Update(shift: IShift): Promise<void>;
}
