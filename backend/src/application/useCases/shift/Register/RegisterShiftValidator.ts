import z from "zod";
import { Weekday } from "../../../../domain/enums/Weekday.js";
import { Frequency } from "../../../../domain/enums/Frequency.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestShiftJson from "../../../../shared/communication/Requests/RequestShiftJson.js";
import BaseValidator from "../../../SharedValidators/BaseValidator.js";

export default class RegisterShiftValidator extends BaseValidator {
  public static Validate(req: InputData<RequestShiftJson>) {
    return z
      .object({
        dateInit: this.dateSchema("Vigência Inicial"),
        dateEnd: this.dateSchema("Vigência Final"),
        weekday: this.enumSchema(Object.keys(Weekday), "Dia da Semana"),
        frequency: this.enumSchema(Object.keys(Frequency), "Frequência"),
        workplace: this.objectIdSchema("Local de Trabalho"),
        employee: this.objectIdSchema("Colaborador"),
      })
      .parse(req.body);
  }
}
