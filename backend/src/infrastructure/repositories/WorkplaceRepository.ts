import { injectable } from "tsyringe";
import type IWorkplaceWriteOnlyRepository from "../../domain/repositories/Workplace/IWorkplaceWriteOnlyRepository.js";
import type IWorkplaceReadOnlyRepository from "../../domain/repositories/Workplace/IWorkplaceReadOnlyRepository.js";
import type IWorkplaceUpdateOnlyRepository from "../../domain/repositories/Workplace/IWorkplaceUpdateOnlyRepository.js";
import type IWorkplaceDeleteOnlyRepository from "../../domain/repositories/Workplace/IWorkplaceDeleteOnlyRepository.js";
import Workplace from "../../domain/entities/Workplace.js";
import type IWorkplace from "../entities/IWorkplace.js";
import type IUser from "../entities/IUser.js";

@injectable()
export default class WorkplaceRepository
  implements
    IWorkplaceWriteOnlyRepository,
    IWorkplaceReadOnlyRepository,
    IWorkplaceUpdateOnlyRepository,
    IWorkplaceDeleteOnlyRepository
{
  async Add(workplace: IWorkplace): Promise<IWorkplace> {
    const newWorkplace = await new Workplace(workplace).save();

    return newWorkplace;
  }

  async ExistActiveWorkplaceWithName(name: string): Promise<boolean> {
    const workplace = await Workplace.findOne({ name: name, active: true });

    return workplace ? true : false;
  }

  async GetById(user: IUser, workplaceId: string): Promise<IWorkplace | null> {
    const workplace = await Workplace.findOne({ _id: workplaceId, adm: user._id });

    return workplace;
  }

  async Update(workplace: IWorkplace): Promise<void> {
    await Workplace.findByIdAndUpdate({ _id: workplace._id }, { $set: workplace }, { new: true });
  }

  async Delete(workplace: IWorkplace): Promise<void> {
    await Workplace.findByIdAndDelete(workplace._id);
  }
}
