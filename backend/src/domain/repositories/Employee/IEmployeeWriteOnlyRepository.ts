import type IEmployee from "../../../infrastructure/entities/IEmployee.js";

export default interface IEmployeeWriteOnlyRepository {
  Add(employee: IEmployee): Promise<IEmployee>;
}
