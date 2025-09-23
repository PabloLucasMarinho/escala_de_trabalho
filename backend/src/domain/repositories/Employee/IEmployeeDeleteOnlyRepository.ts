import type IEmployee from "../../../infrastructure/entities/IEmployee.js";

export default interface IEmployeeDeleteOnlyRepository {
  Delete(employee: IEmployee): Promise<void>;
}
