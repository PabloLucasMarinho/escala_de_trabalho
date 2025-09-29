import { inject, injectable } from "tsyringe";
import type IUpdateShiftUseCase from "./IUpdateShiftUseCase.js";
import type RequestShiftJson from "../../../../shared/communication/Requests/RequestShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import UpdateShiftValidator from "./UpdateShiftValidator.js";
import type IShiftReadOnlyRepository from "../../../../domain/repositories/Shift/IShiftReadOnlyRepository.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";
import type IShiftUpdateOnlyRepository from "../../../../domain/repositories/Shift/IShiftUpdateOnlyRepository.js";

@injectable()
export default class UpdateShiftUseCase implements IUpdateShiftUseCase {
  constructor(
    @inject("IShiftReadOnlyRepository") private readonly readOnlyRepository: IShiftReadOnlyRepository,
    @inject("IShiftUpdateOnlyRepository") private readonly updateOnlyRepository: IShiftUpdateOnlyRepository
  ) {}

  async Execute(req: InputData<RequestShiftJson>): Promise<void> {
    const paramsId = checkParamsId(req.params.id);

    const inputData = this.Validate(req);

    const shift = await this.readOnlyRepository.GetById(paramsId);

    if (!shift) {
      throw new Error("Turno não encontrado.");
    }

    if (inputData.dateInit) {
      shift.dateInit = inputData.dateInit;
    }
    if (inputData.dateEnd) {
      shift.dateEnd = inputData.dateEnd;
    }
    if (inputData.weekday) {
      shift.weekday = inputData.weekday;
    }
    if (inputData.frequency) {
      shift.frequency = inputData.frequency;
    }
    if (inputData.workplace) {
      shift.workplace = inputData.workplace;
    }
    if (inputData.employee) {
      shift.employee = inputData.employee;
    }

    await this.updateOnlyRepository.Update(shift);
  }

  private Validate(req: InputData<RequestShiftJson>) {
    const inputData = UpdateShiftValidator.Validate(req);

    return inputData;
  }
}
