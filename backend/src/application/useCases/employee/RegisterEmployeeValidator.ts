import z from "zod";
import { nameRegex } from "../../../shared/communication/constants/regex.js";
import type { InputData } from "../../../shared/communication/types/Request.js";
import type { RequestRegisterEmployeeJson } from "../../../shared/communication/Requests/RequestRegisterEmployeeJson.js";

export class RegisterEmployeeValidator {
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

  public static Validate(req: InputData<RequestRegisterEmployeeJson>) {
    return this.ValidateData().parse(req.body);
  }
}
