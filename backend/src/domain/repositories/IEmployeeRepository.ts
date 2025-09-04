import type { HydratedDocument } from "mongoose";
import type { IEmployee } from "../entities/IEmployee.js";
import type { IUser } from "../entities/IUser.js";

export interface IEmployeeRepository {
  // Cria um novo funcionário
  create(employee: IEmployee): Promise<HydratedDocument<IEmployee>>;

  findByName(name: string): Promise<HydratedDocument<IEmployee> | null>;

  findById(id: string): Promise<HydratedDocument<IUser>>;
}
