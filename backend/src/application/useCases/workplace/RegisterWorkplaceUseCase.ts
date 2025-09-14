import type { HydratedDocument } from "mongoose";
import type { IRegisterWorkplaceDTO } from "../../../shared/communication/dtos/workplace/IRegisterWorkplaceDTO.js";
import type { IWorkplace } from "../../../infrastructure/entities/IWorkplace.js";
import type { IWorkplaceRepository } from "../../../domain/repositories/IWorkplaceRepository.js";
import type { IAuthService } from "../../../domain/services/IAuthService.js";
import mongoose from "mongoose";

export class RegisterWorkplaceUseCase {
  constructor(
    private workplaceRepository: IWorkplaceRepository,
    private authService: IAuthService
  ) {}
  async execute(
    data: IRegisterWorkplaceDTO,
    token: string
  ): Promise<HydratedDocument<IWorkplace>> {
    // Verifica se o local de trabalho já existe
    const workplaceExists = await this.workplaceRepository.findByName(
      data.name
    );
    if (workplaceExists) {
      throw new Error("Este local de trabalho já foi adicionado.");
    }

    // Persiste os dados no bd e retorna eles
    const userId = this.authService.getUserId(token!);

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const newWorkplace = await this.workplaceRepository.create({
      ...data,
      adm: userObjectId,
    });

    return newWorkplace;
  }
}
