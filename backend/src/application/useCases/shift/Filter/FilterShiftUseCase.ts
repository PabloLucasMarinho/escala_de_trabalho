import { inject, injectable } from "tsyringe";
import type FilterShiftDTO from "../../../../domain/Dtos/FilterShiftDTO.js";
import type RequestFilterShiftJson from "../../../../shared/communication/Requests/RequestFilterShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import FilterShiftValidator from "./FilterShiftValidator.js";
import type IFilterShiftUseCase from "./IFilterShiftUseCase.js";
import type IShiftReadOnlyRepository from "../../../../domain/repositories/Shift/IShiftReadOnlyRepository.js";
import ResponseShiftJson from "../../../../shared/communication/Responses/ResponseShiftJson.js";

@injectable()
export default class FilterShiftUseCase implements IFilterShiftUseCase {
  constructor(@inject("IShiftReadOnlyRepository") private readonly readOnlyRepository: IShiftReadOnlyRepository) {}

  async Execute(req: InputData<RequestFilterShiftJson>): Promise<ResponseShiftJson[] | null> {
    const filters = this.Validate(req);

    const shifts = await this.readOnlyRepository.Filter(filters);
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
      response.createdBy = shift.createdBy?.toString();
      response.updatedBy = shift.updatedBy?.toString();

      return response;
    });

    return responses;
  }

  private Validate(req: InputData<RequestFilterShiftJson>): FilterShiftDTO {
    const filters = FilterShiftValidator.Validate(req);

    return filters;
  }
}
