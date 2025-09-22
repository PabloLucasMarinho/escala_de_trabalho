import type { IEmployee } from "../../../infrastructure/entities/IEmployee.js";

export interface IEmployeeDeleteOnlyRepository {
  Delete(employee: IEmployee): Promise<void>;
}
