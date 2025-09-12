import type { HydratedDocument } from "mongoose";
import type { IEmployee } from "../../domain/entities/IEmployee.js";
import type { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository.js";
import Employee from "../../domain/entities/Employee.js";
import type { IUser } from "../../domain/entities/IUser.js";
import type { IRegisterEmployeeDTO } from "../../shared/communication/dtos/employee/IRegisterEmployeeDTO.js";

export class EmployeeRepository implements IEmployeeRepository {
  async create(
    employee: IRegisterEmployeeDTO
  ): Promise<HydratedDocument<IEmployee>> {
    const newEmployee = new Employee(employee);
    const savedEmployee = await newEmployee.save();

    return savedEmployee;
  }

  findById(id: string): Promise<HydratedDocument<IUser>> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<HydratedDocument<IEmployee> | null> {
    const employee = await Employee.findOne({ name });

    return employee;
  }
}
