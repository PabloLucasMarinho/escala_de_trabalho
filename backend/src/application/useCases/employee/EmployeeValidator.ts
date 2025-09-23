import z from "zod";
import { nameRegex } from "../../../shared/communication/constants/regex.js";
import type { InputData } from "../../../shared/communication/types/InputData.js";
import type RequestEmployeeJson from "../../../shared/communication/Requests/RequestEmployeeJson.js";

export default class EmployeeValidator {
  private static ValidateData() {
    return z.object({
      name: z
        .string()
        .nonempty({ error: "O nome é obrigatório." })
        .trim()
        .superRefine((value, context) => {
          if (value && value.length > 0) {
            if (!nameRegex.test(value)) {
              context.addIssue("O nome só pode conter letras, espaços, hífens e apóstrofos.");
            }
          }
        }),
    });
  }

  public static Validate(req: InputData<RequestEmployeeJson>) {
    return this.ValidateData().parse(req.body);
  }
}
