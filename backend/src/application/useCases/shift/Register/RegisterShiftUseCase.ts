import { inject, injectable } from "tsyringe";
import type IRegisterShiftUseCase from "./IRegisterShiftUseCase.js";
import type RequestShiftJson from "../../../../shared/communication/Requests/RequestShiftJson.js";
import ResponseRegisteredShiftJson from "../../../../shared/communication/Responses/ResponseRegisteredShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IShift from "../../../../infrastructure/entities/IShift.js";
import RegisterShiftValidator from "./RegisterShiftValidator.js";
import type IShiftWriteOnlyRepository from "../../../../domain/repositories/Shift/IShiftWriteOnlyRepository.js";

@injectable()
export default class RegisterShiftUseCase implements IRegisterShiftUseCase {
  constructor(@inject("IShiftWriteOnlyRepository") private readonly writeOnlyRepository: IShiftWriteOnlyRepository) {}

  async Execute(req: InputData<RequestShiftJson>): Promise<ResponseRegisteredShiftJson> {
    const shift = this.Validate(req);

    const shiftId = await this.writeOnlyRepository.Add(shift);

    const response = new ResponseRegisteredShiftJson();

    response.id = shiftId.toString();

    return response;
  }

  private Validate(req: InputData<RequestShiftJson>): IShift {
    const shift = RegisterShiftValidator.Validate(req);

    return shift;
  }
}
