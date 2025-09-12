import type { HydratedDocument } from "mongoose";
import type { IShift } from "../../domain/entities/IShift.js";
import type { IShiftRepository } from "../../domain/repositories/IShiftRepository.js";
import Shift from "../../domain/entities/Shift.js";
import type { IRegisterShiftDTO } from "../../shared/communication/dtos/shift/IRegisterShiftDTO.js";

export class ShiftRepository implements IShiftRepository {
  async create(shift: IShift): Promise<IShift> {
    const newShift = new Shift(shift);
    const savedShift = await newShift.save();

    return savedShift;
  }
}
