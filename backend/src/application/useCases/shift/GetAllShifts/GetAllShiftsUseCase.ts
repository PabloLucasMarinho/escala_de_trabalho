import { inject, injectable } from "tsyringe";
import type IGetAllShiftsUseCase from "./IGetAllShiftsUseCase.js";
import type IShiftReadOnlyRepository from "../../../../domain/repositories/Shift/IShiftReadOnlyRepository.js";
import ResponseShiftJson from "../../../../shared/communication/Responses/ResponseShiftJson.js";

@injectable()
export default class GetAllShiftsUseCase implements IGetAllShiftsUseCase {
  constructor(@inject("IShiftReadOnlyRepository") private readonly readOnlyRepository: IShiftReadOnlyRepository) {}

  async Execute(): Promise<ResponseShiftJson[] | null> {
    const shifts = await this.readOnlyRepository.GetAll();
    if (!shifts) return null;

    const responses: ResponseShiftJson[] = shifts.map((shift) => {
      const response = new ResponseShiftJson();
      if (!shift._id) {
        throw new Error("ID do turno inválido.");
      }

      response.id = shift._id.toString();
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
