import z from "zod";
import { passwordRegex } from "../../../../shared/communication/constants/regex.js";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestChangePasswordJson from "../../../../shared/communication/Requests/RequestChangePasswordJson.js";

export default class ChangePasswordValidator {
  private static ValidateData() {
    return z
      .object({
        currentPassword: z.string().nonempty({ error: "A senha atual não pode ser vazia." }).regex(passwordRegex, {
          error:
            "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.",
        }),
        newPassword: z.string().nonempty({ error: "A nova senha não pode ser vazia." }).regex(passwordRegex, {
          error:
            "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.",
        }),
        confirmPassword: z.string(),
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        error: "A senha e a confirmação de senha não conferem.",
        path: ["confirmPassword"],
      });
  }

  public static Validate(req: InputData<RequestChangePasswordJson>) {
    return this.ValidateData().parse(req.body);
  }
}
