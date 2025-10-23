import { inject, injectable } from "tsyringe";
import type IRegisterShiftUseCase from "./IRegisterShiftUseCase.js";
import type RequestShiftJson from "../../../../shared/communication/Requests/RequestShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type IShift from "../../../../infrastructure/entities/IShift.js";
import RegisterShiftValidator from "./RegisterShiftValidator.js";
import type IShiftWriteOnlyRepository from "../../../../domain/repositories/Shift/IShiftWriteOnlyRepository.js";
import { checkLoggedUser } from "../../../SharedValidators/CheckLoggedUser.js";

@injectable()
export default class RegisterShiftUseCase implements IRegisterShiftUseCase {
  constructor(@inject("IShiftWriteOnlyRepository") private readonly writeOnlyRepository: IShiftWriteOnlyRepository) {}

  async Execute(req: InputData<RequestShiftJson>): Promise<void> {
    const shift = this.Validate(req);

    const user = await checkLoggedUser(req);
    if (!user || !user._id) {
      throw new Error("Você precisa estar logado para cadastrar um turno.");
    }

    shift.createdBy = user._id;
    shift.updatedBy = user._id;

    await this.writeOnlyRepository.Add(shift);
  }

  private Validate(req: InputData<RequestShiftJson>): IShift {
    const shift = RegisterShiftValidator.Validate(req);

    return shift;
  }
}
