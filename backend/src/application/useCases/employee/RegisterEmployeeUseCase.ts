import type { HydratedDocument } from "mongoose";
import type { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository.js";
import type { IRegisterEmployeeDTO } from "../../../shared/communication/dtos/employee/IRegisterEmployeeDTO.js";
import type { IEmployee } from "../../../domain/entities/IEmployee.js";
import type { IAuthService } from "../../../domain/services/IAuthService.js";
import mongoose from "mongoose";

export default class RegisterEmployeeUseCase {
  constructor(
    private employeeRepository: IEmployeeRepository,
    private authService: IAuthService
  ) {}

  async execute(
    data: IRegisterEmployeeDTO,
    token: string
  ): Promise<HydratedDocument<IEmployee>> {
    // Verifica se funcionário já existe
    const employeeExists = await this.employeeRepository.findByName(data.name);
    if (employeeExists) {
      throw new Error("Colaborador já cadastrado.");
    }

    // Persiste os dados do novo funcionário no bd e retorna ele
    const userId = this.authService.getUserId(token!);

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const newEmployee = await this.employeeRepository.create({
      ...data,
      adm: userObjectId,
    });

    return newEmployee;
  }
}
