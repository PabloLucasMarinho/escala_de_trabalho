import z from "zod";
import { Weekday } from "../../../../domain/enums/Weekday.js";
import { Frequency } from "../../../../domain/enums/Frequency.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestShiftJson from "../../../../shared/communication/Requests/RequestShiftJson.js";
import BaseValidator from "../../../SharedValidators/BaseValidator.js";

export default class UpdateShiftValidator extends BaseValidator {
  public static Validate(req: InputData<RequestShiftJson>) {
    return z
      .object({
        dateInit: this.optionalDateSchema,
        dateEnd: this.optionalDateSchema,
        weekday: this.optionalEnumSchema(Object.values(Weekday), "Dia da Semana"),
        frequency: this.optionalEnumSchema(Object.values(Frequency), "Frequência"),
        workplace: this.optionalObjectIdSchema,
        employee: this.optionalObjectIdSchema,
      })
      .parse(req.body);
  }
}
