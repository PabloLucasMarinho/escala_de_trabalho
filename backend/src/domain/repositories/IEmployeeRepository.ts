import type { HydratedDocument } from "mongoose";
import type { IEmployee } from "../../infrastructure/entities/IEmployee.js";
import type { IUser } from "../../infrastructure/entities/IUser.js";
import type { IRegisterEmployeeDTO } from "../../shared/communication/dtos/employee/IRegisterEmployeeDTO.js";

export interface IEmployeeRepository {
  // Cria um novo funcionário
  create(employee: IRegisterEmployeeDTO): Promise<HydratedDocument<IEmployee>>;

  findByName(name: string): Promise<HydratedDocument<IEmployee> | null>;

  findById(id: string): Promise<HydratedDocument<IUser>>;
}
