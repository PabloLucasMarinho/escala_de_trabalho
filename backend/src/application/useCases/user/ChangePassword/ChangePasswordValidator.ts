import z, { ZodError } from "zod";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestChangePasswordJson from "../../../../shared/communication/Requests/RequestChangePasswordJson.js";
import BaseValidator from "../../../SharedValidators/BaseValidator.js";

export default class ChangePasswordValidator extends BaseValidator {
  public static Validate(req: InputData<RequestChangePasswordJson>) {
    this.passwordSchema.parse(req.body.currentPassword);

    if (this.passwordSchema.parse(req.body.newPassword) !== this.confirmPasswordSchema.parse(req.body.confirmPassword)) {
      throw new ZodError([
        {
          code: "custom",
          message: "Erro de Validação: A senha e a confirmação de senha não conferem.",
          path: ["password"],
        },
      ]);
    }

    return z.object({ newPassword: this.passwordSchema }).parse(req.body);
  }
}
