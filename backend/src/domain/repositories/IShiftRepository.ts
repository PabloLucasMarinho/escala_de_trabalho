import type { HydratedDocument } from "mongoose";
import type { IShift } from "../entities/IShift.js";
import type { IRegisterShiftDTO } from "../../shared/communication/dtos/shift/IRegisterShiftDTO.js";

export interface IShiftRepository {
  create(shift: IShift): Promise<IShift>;
}
