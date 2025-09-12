import type { HydratedDocument, Types } from "mongoose";
import type { IWorkplace } from "../../domain/entities/IWorkplace.js";
import type { IWorkplaceRepository } from "../../domain/repositories/IWorkplaceRepository.js";
import Workplace from "../../domain/entities/Workplace.js";
import type { IRegisterWorkplaceDTO } from "../../shared/communication/dtos/workplace/IRegisterWorkplaceDTO.js";

export class WorkplaceRepository implements IWorkplaceRepository {
  async create(
    worplace: IRegisterWorkplaceDTO
  ): Promise<HydratedDocument<IWorkplace>> {
    const newWorkplace = new Workplace(worplace);
    const savedWorkplace = await newWorkplace.save();

    return savedWorkplace;
  }

  async getbyId(
    id: Types.ObjectId
  ): Promise<HydratedDocument<IWorkplace> | null> {
    const workplace = await Workplace.findById(id);

    return workplace;
  }

  async findByName(name: string): Promise<HydratedDocument<IWorkplace> | null> {
    const workplace = await Workplace.findOne({ name });

    return workplace;
  }

  update(name: string): Promise<HydratedDocument<IWorkplace>> {
    throw new Error("Method not implemented.");
  }

  delete(name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
