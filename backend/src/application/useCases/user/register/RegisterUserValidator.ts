import z, { ZodError } from "zod";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestRegisterUserJson from "../../../../shared/communication/Requests/RequestRegisterUserJson.js";
import BaseValidator from "../../../SharedValidators/BaseValidator.js";

export default class RegisterUserValidator extends BaseValidator {
  public static Validate(req: InputData<RequestRegisterUserJson>) {
    if (this.passwordSchema.parse(req.body.password) !== this.confirmPasswordSchema.parse(req.body.confirmPassword)) {
      throw new ZodError([
        {
          code: "custom",
          message: "Erro de Validação: A senha e a confirmação de senha não conferem.",
          path: ["password"],
        },
      ]);
    }
    return z
      .object({
        name: this.nameStringSchema,
        email: this.emailStringSchema,
        password: this.passwordSchema,
      })
      .parse(req.body);
  }
}
