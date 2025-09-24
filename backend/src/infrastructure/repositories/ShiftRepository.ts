import { injectable } from "tsyringe";
import Shift from "../../domain/entities/Shift.js";
import type IShiftDeleteOnlyRepository from "../../domain/repositories/Shift/IShiftDeleteOnlyRepository.js";
import type IShiftReadOnlyRepository from "../../domain/repositories/Shift/IShiftReadOnlyRepository.js";
import type IShiftUpdateOnlyRepository from "../../domain/repositories/Shift/IShiftUpdateOnlyRepository.js";
import type IShiftWriteOnlyRepository from "../../domain/repositories/Shift/IShiftWriteOnlyRepository.js";
import type IShift from "../entities/IShift.js";
import type { Types } from "mongoose";

@injectable()
export default class ShiftRepository
  implements IShiftWriteOnlyRepository, IShiftReadOnlyRepository, IShiftUpdateOnlyRepository, IShiftDeleteOnlyRepository
{
  async Add(shift: IShift): Promise<Types.ObjectId> {
    const newShift = await new Shift(shift).save();

    return newShift._id;
  }

  async GetById(shitId: string): Promise<IShift | null> {
    const shift = await Shift.findOne({ _id: shitId, active: true });

    return shift;
  }

  async Update(shift: IShift): Promise<void> {
    await Shift.findByIdAndUpdate({ _id: shift._id }, { $set: shift }, { new: true });
  }

  async Delete(shift: IShift): Promise<void> {
    await Shift.findByIdAndDelete(shift._id);
  }
}
