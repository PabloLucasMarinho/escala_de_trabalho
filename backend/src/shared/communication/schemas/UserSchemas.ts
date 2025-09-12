import { z } from "zod";
import { nameRegex, passwordRegex } from "../constants/regex.js";
import type { IRegisterUserDTO } from "../dtos/user/IRegisterUserDTO.js";
import type { ILoginUserDTO } from "../dtos/user/ILoginUserDTO.js";
import type { IUpdateUserDTO } from "../dtos/user/IUpdateUserDTO.js";

export class UserSchemas {
  private static register() {
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

  public static validateRegister(data: IRegisterUserDTO) {
    return this.register().parse(data);
  }

  private static login() {
    return z.object({
      email: z
        .email({ error: "O e-mail fornecido é inválido." })
        .trim()
        .nonempty({ error: "O e-mail é obrigatório." }),
      password: z.string().nonempty({ error: "A senha é obrigatória." }),
    });
  }

  public static validateLogin(data: ILoginUserDTO) {
    return this.login().parse(data);
  }

  private static update() {
    return z
      .object({
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
            // Valida o e-mail somente se o valor não for uma string vazia
            if (value && value.length > 0) {
              try {
                z.email().parse(value);
              } catch (error) {
                context.addIssue("O e-mail fornecido é inválido.");
              }
            }
          }),
        password: z
          .string()
          .optional()
          .superRefine((value, context) => {
            // Valida a senha somente se o valor não for uma string vazia
            if (value && value.length > 0) {
              if (!passwordRegex.test(value)) {
                context.addIssue(
                  "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial."
                );
              }
            }
          }),
        confirmPassword: z.string().optional(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        error: "A senha e a confirmação de senha não conferem.",
        path: ["confirmPassword"],
      });
  }

  public static validateUpdate(data: IUpdateUserDTO) {
    return this.update().parse(data);
  }
}
