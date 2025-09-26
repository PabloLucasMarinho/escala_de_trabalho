import { inject, injectable } from "tsyringe";
import type FilterShiftDTO from "../../../../domain/Dtos/FilterShiftDTO.js";
import type RequestFilterShiftJson from "../../../../shared/communication/Requests/RequestFilterShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import FilterShiftValidator from "./FilterShiftValidator.js";
import type IFilterShiftUseCase from "./IFilterShiftUseCase.js";
import type IShiftReadOnlyRepository from "../../../../domain/repositories/Shift/IShiftReadOnlyRepository.js";
import type ResponseShiftJson from "../../../../shared/communication/Responses/ResponseShiftJson.js";

@injectable()
export default class FilterShiftUseCase implements IFilterShiftUseCase {
  constructor(@inject("IShiftReadOnlyRepository") private readonly readOnlyRepository: IShiftReadOnlyRepository) {}

  async Execute(req: InputData<RequestFilterShiftJson>): Promise<ResponseShiftJson[] | null> {
    const filters = this.Validate(req);

    const shifts = await this.readOnlyRepository.Filter(filters);

    if (shifts.length === 0) {
      return null;
    }

    return shifts as ResponseShiftJson[];
  }

  private Validate(req: InputData<RequestFilterShiftJson>): FilterShiftDTO {
    const filters = FilterShiftValidator.Validate(req);

    return filters;
  }
}
