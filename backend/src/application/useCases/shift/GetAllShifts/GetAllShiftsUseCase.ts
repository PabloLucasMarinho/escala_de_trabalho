import { inject, injectable } from "tsyringe";
import type IGetAllShiftsUseCase from "./IGetAllShiftsUseCase.js";
import type IShiftReadOnlyRepository from "../../../../domain/repositories/Shift/IShiftReadOnlyRepository.js";
import ResponseGetAllShiftsJson from "../../../../shared/communication/Responses/ReponseGetAllShiftsJson.js";

@injectable()
export default class GetAllShiftsUseCase implements IGetAllShiftsUseCase {
  constructor(@inject("IShiftReadOnlyRepository") private readonly readOnlyRepository: IShiftReadOnlyRepository) {}

  async Execute(): Promise<ResponseGetAllShiftsJson[] | null> {
    const shifts = await this.readOnlyRepository.GetAll();

    const responses: ResponseGetAllShiftsJson[] = shifts.map((shift) => {
      const response = new ResponseGetAllShiftsJson();

      response.id = shift._id!.toString();
      response.dateInit = shift.dateInit;
      response.dateEnd = shift.dateEnd;
      response.weekday = shift.weekday;
      response.frequency = shift.frequency;
      response.workplace = shift.workplace.toString();
      response.employee = shift.employee.toString();

      return response;
    });

    return responses.length === 0 ? null : responses;
  }
}
