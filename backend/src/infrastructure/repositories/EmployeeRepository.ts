import { injectable } from "tsyringe";
import type { IEmployeeReadOnlyRepository } from "../../domain/repositories/Employee/IEmployeeReadOnlyRepository.js";
import type { RequestRegisterEmployeeJson } from "../../shared/communication/Requests/RequestRegisterEmployeeJson.js";
import type { InputData } from "../../shared/communication/types/Request.js";
import type { IEmployee } from "../entities/IEmployee.js";
import type { IUser } from "../entities/IUser.js";
import Employee from "../../domain/entities/Employee.js";
import type { IEmployeeWriteOnlyRepository } from "../../domain/repositories/Employee/IEmployeeWriteOnlyRepository.js";

@injectable()
export class EmployeeRepository implements IEmployeeReadOnlyRepository, IEmployeeWriteOnlyRepository {
  async Add(employee: IEmployee): Promise<IEmployee> {
    const newEmployee = await new Employee(employee).save();

    return newEmployee;
  }

  async ExistActiveEmployeeWithName(name: string): Promise<boolean> {
    const employee = await Employee.exists({ name: name.toUpperCase(), active: true });

    return employee ? false : true;
  }

  GetById(user: IUser, employeeId: string): Promise<IEmployee | null> {
    throw new Error("Method not implemented.");
  }
}
