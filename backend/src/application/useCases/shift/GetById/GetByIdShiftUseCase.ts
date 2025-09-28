import { inject, injectable } from "tsyringe";
import ResponseShiftJson from "../../../../shared/communication/Responses/ResponseShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IGetByIdShiftUseCase from "./IGetByIdShiftUseCase.js";
import type IShiftReadOnlyRepository from "../../../../domain/repositories/Shift/IShiftReadOnlyRepository.js";

@injectable()
export default class GetByIdShiftUseCase implements IGetByIdShiftUseCase {
  constructor(@inject("IShiftReadOnlyRepository") private readonly readOnlyRepository: IShiftReadOnlyRepository) {}
  async Execute(req: InputData<any>): Promise<ResponseShiftJson> {
    if (!req.params.id) {
      throw new Error("ID não informado.");
    }

    const shift = await this.readOnlyRepository.GetById(req.params.id);

    if (!shift) {
      throw new Error("O turno informado não existe.");
    }

    const response = new ResponseShiftJson();

    response.id = shift._id!;
    response.dateInit = shift.dateInit;
    response.dateEnd = shift.dateEnd;
    response.weekday = shift.weekday;
    response.frequency = shift.frequency;
    response.workplace = shift.workplace;
    response.employee = shift.employee;

    return response;
  }
}
