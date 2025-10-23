import type IShift from "../../../infrastructure/entities/IShift.js";
import type FilterShiftDTO from "../../Dtos/FilterShiftDTO.js";

export default interface IShiftReadOnlyRepository {
  GetById(shiftId: string): Promise<IShift | null>;
  Filter(filters: FilterShiftDTO): Promise<IShift[] | null>;
  GetAll(): Promise<IShift[] | null>;
}
