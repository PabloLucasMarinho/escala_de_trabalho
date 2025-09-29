import { inject, injectable } from "tsyringe";
import type IDeleteShiftUseCase from "./IDeleteShiftUseCase.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import { checkParamsId } from "../../../SharedValidators/CheckParamsId.js";
import type IShiftReadOnlyRepository from "../../../../domain/repositories/Shift/IShiftReadOnlyRepository.js";
import type IShiftDeleteOnlyRepository from "../../../../domain/repositories/Shift/IShiftDeleteOnlyRepository.js";

@injectable()
export default class DeleteShiftUseCase implements IDeleteShiftUseCase {
  constructor(
    @inject("IShiftReadOnlyRepository") private readonly readOnlyRepository: IShiftReadOnlyRepository,
    @inject("IShiftDeleteOnlyRepository") private readonly deleteOnlyRepository: IShiftDeleteOnlyRepository
  ) {}

  async Execute(req: InputData<any>): Promise<void> {
    const paramsId = checkParamsId(req.params.id);

    const shift = await this.readOnlyRepository.GetById(paramsId);

    if (!shift) {
      throw new Error("Turno não encontrado.");
    }

    await this.deleteOnlyRepository.Delete(shift);
  }
}
