import type { HydratedDocument, Types } from "mongoose";
import type { IWorkplace } from "../../infrastructure/entities/IWorkplace.js";
import type { IRegisterWorkplaceDTO } from "../../shared/communication/dtos/workplace/IRegisterWorkplaceDTO.js";

export interface IWorkplaceRepository {
  // Cria um novo local de trabalho no bd
  create(
    worplace: IRegisterWorkplaceDTO
  ): Promise<HydratedDocument<IWorkplace>>;

  // Encontra local de trabalho pelo id
  getbyId(id: Types.ObjectId): Promise<HydratedDocument<IWorkplace> | null>;

  // Encontra local de trabalho pelo nome
  findByName(name: string): Promise<HydratedDocument<IWorkplace> | null>;

  // Atualiza um local de trabalho
  update(name: string): Promise<HydratedDocument<IWorkplace>>;

  // Deleta um local de trabalho
  delete(name: string): Promise<void>;
}
