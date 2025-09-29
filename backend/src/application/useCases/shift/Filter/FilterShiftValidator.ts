import z from "zod";
import { Weekday } from "../../../../domain/enums/Weekday.js";
import { Frequency } from "../../../../domain/enums/Frequency.js";
import type RequestFilterShiftJson from "../../../../shared/communication/Requests/RequestFilterShiftJson.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import BaseValidator from "../../../SharedValidators/BaseValidator.js";

export default class FilterShiftValidator extends BaseValidator {
  public static Validate(req: InputData<RequestFilterShiftJson>) {
    return z
      .object({
        weekday: this.optionalEnumSchema(Object.values(Weekday), "Dia da Semana"),
        frequency: this.optionalEnumSchema(Object.values(Frequency), "Frequência"),
        workplace: this.optionalObjectIdSchema,
        employee: this.optionalObjectIdSchema,
      })
      .parse(req.body);
  }
}
