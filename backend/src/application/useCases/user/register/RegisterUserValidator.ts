import z from "zod";
import {
  nameRegex,
  passwordRegex,
} from "../../../../shared/communication/constants/regex.js";
import type { Request } from "express";

export class RegisterUserValidator {
  private static ValidateData() {
    return z
      .object({
        name: z
          .string()
          .trim()
          .nonempty({ error: "O nome é obrigatório." })
          .superRefine((value, context) => {
            if (value && value.length > 0) {
              if (!nameRegex.test(value)) {
                context.addIssue(
                  "O nome só pode conter letras, espaços, hífens e apóstrofos."
                );
              }
            }
          }),
        email: z
          .email({ error: "O e-mail fornecido é inválido." })
          .trim()
          .nonempty({ error: "O e-mail é obrigatório." }),
        password: z
          .string()
          .nonempty({ error: "A senha é obrigatória." })
          .regex(passwordRegex, {
            error:
              "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.",
          }),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        error: "A senha e a confirmação de senha não conferem.",
        path: ["confirmPassword"],
      });
  }

  public static Validate(req: Request) {
    return this.ValidateData().parse(req.body);
  }
}
