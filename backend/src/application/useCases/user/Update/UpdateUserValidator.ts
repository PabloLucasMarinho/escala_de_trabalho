import z from "zod";
import { nameRegex } from "../../../../shared/communication/constants/regex.js";
import type { Request } from "express";

export class UpdateUserValidator {
  private static ValidateData() {
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
    });
  }

  public static Validate(req: Request) {
    return this.ValidateData().parse(req.body);
  }
}
