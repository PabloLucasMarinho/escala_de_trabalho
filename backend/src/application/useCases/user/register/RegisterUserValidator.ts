import z from "zod";
import type { InputData } from "../../../../shared/communication/types/InputData.js";
import type RequestRegisterUserJson from "../../../../shared/communication/Requests/RequestRegisterUserJson.js";
import BaseValidator from "../../../SharedValidators/BaseValidator.js";

export default class RegisterUserValidator extends BaseValidator {
  public static Validate(req: InputData<RequestRegisterUserJson>) {
    return z
      .object({
        name: this.nameStringSchema,
        email: this.emailStringSchema,
        password: this.registerPasswordSchema,
      })
      .parse(req.body);
  }
}
