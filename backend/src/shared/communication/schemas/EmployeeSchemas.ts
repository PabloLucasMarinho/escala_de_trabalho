import z from "zod";
import { nameRegex } from "../constants/regex.js";
import type { IRegisterEmployeeDTO } from "../dtos/employee/IRegisterEmployeeDTO.js";

export class EmployeeSchemas {
  private static register() {
    return z.object({
      name: z
        .string()
        .nonempty({ message: "O nome é obrigatório." })
        .trim()
        .superRefine((value, context) => {
          if (value && value.length > 0) {
            if (!nameRegex.test(value)) {
              context.addIssue(
                "O nome só pode conter letras, espaços, hífens e apóstrofos."
              );
            }
          }
        }),
    });
  }

  public static validateRegister(data: IRegisterEmployeeDTO) {
    return this.register().parse(data);
  }
}
