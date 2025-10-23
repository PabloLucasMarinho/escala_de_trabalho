import type IShift from "../../../infrastructure/entities/IShift.js";

export default interface IShiftWriteOnlyRepository {
  Add(shift: IShift): Promise<IShift>;
}
