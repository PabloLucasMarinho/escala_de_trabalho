import z from "zod";
import {
  nameRegex,
  passwordRegex,
} from "../../../../shared/communication/constants/regex.js";
import type { Request } from "express";

export class UpdateUserValidator {
  private static Update() {
    return z.object({
      name: z
        .string()
        .trim()
        .optional()
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
        .string()
        .trim()
        .optional()
        .superRefine((value, context) => {
          if (value && value.length > 0) {
            try {
              z.email().parse(value);
            } catch (error) {
              context.addIssue("O e-mail fornecida é inválido.");
            }
          }
        }),
      // password: z
      //   .string()
      //   .optional()
      //   .superRefine((value, context) => {
      //     if (value && value.length > 0) {
      //       if (!passwordRegex.test(value)) {
      //         context.addIssue(
      //           "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial."
      //         );
      //       }
      //     }
      //   }),
      // confirmPassword: z.string().optional(),
    });
    // .refine((data) => data.password === data.confirmPassword, {
    //   error: "A senha e a confirmação de senha não conferem.",
    //   path: ["confirmPassword"],
    // });
  }

  public static Validate(req: Request) {
    return this.Update().parse(req.body);
  }
}
