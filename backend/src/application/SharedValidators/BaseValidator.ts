import z from "zod";
import { dateRegex, nameRegex, passwordRegex } from "../../shared/communication/constants/regex.js";
import { isValidObjectId, Types } from "mongoose";

export default class BaseValidator {
  private static checkString(value: unknown) {
    return typeof value === "string" && value.trim() === "" ? undefined : value;
  }

  static optionalDateSchema = z.preprocess(
    (value) => this.checkString(value),
    z
      .string()
      .regex(dateRegex, "Data inválida. Use o formato YYYY-MM-DDTHH:MM:SSZ.")
      .transform((value) => new Date(value))
      .optional()
  );

  static dateSchema = (field: string) =>
    z.preprocess(
      (value) => this.checkString(value),
      z
        .string()
        .nonempty(`A ${field} não pode estar vazia.`)
        .regex(dateRegex, "Data inválida. Use o formato YYYY-MM-DDTHH:MM:SSZ.")
        .transform((value) => new Date(value))
    );

  static optionalEnumSchema = (validValues: string[], field: string) => {
    return z.preprocess(
      (value) => this.checkString(value),
      z
        .string()
        .optional()
        .superRefine((value, context) => {
          if (value && !validValues.includes(value)) {
            context.addIssue(`${field} inválido(a)`);
          }
        })
    );
  };

  static enumSchema = (validValues: string[], field: string) => {
    return z.preprocess(
      (value) => this.checkString(value),
      z
        .string()
        .nonempty({ error: `O(A) ${field} não pode ser vazio.` })
        .superRefine((value, context) => {
          if (value && !validValues.includes(value)) {
            context.addIssue(`${field} inválido(a)`);
          }
        })
    );
  };

  static optionalObjectIdSchema = z.preprocess(
    (value) => this.checkString(value),
    z
      .string()
      .refine((value) => isValidObjectId(value), { error: "ID inválido." })
      .transform((value) => new Types.ObjectId(value))
      .optional()
  );

  static objectIdSchema = (field: string) =>
    z.preprocess(
      (value) => this.checkString(value),
      z
        .string()
        .nonempty({ error: `É obrigatório informar um(a) ${field} para o turno.` })
        .refine((value) => isValidObjectId(value), { error: "ID inválido." })
        .transform((value) => new Types.ObjectId(value))
    );

  static optionalNameStringSchema = z.preprocess(
    (value) => this.checkString(value),
    z.string().regex(nameRegex, "O nome só pode conter letras, espaços, hífens e apóstrofos.").optional()
  );

  static nameStringSchema = z.preprocess(
    (value) => this.checkString(value),
    z
      .string()
      .nonempty({ error: "O nome é obrigatório." })
      .regex(nameRegex, "O nome só pode conter letras, espaços, hífens e apóstrofos.")
  );

  static optionalEmailStringSchema = z.preprocess(
    (value) => this.checkString(value),
    z.email({ error: "O e-mail fornecido é inválido." }).optional()
  );

  static emailStringSchema = z.preprocess(
    (value) => this.checkString(value),
    z.email({ error: "O e-mail fornecido é inválido." }).nonempty({ error: "O e-mail é obrigatório." })
  );

  static registerPasswordSchema = z
    .object({
      password: z.preprocess(
        (value) => this.checkString(value),
        z
          .string()
          .nonempty({ error: "A senha é obrigatória." })
          .regex(
            passwordRegex,
            "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial."
          )
      ),
      confirmPassword: z.preprocess((value) => this.checkString(value), z.string()),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: "A senha e a confirmação de senha não conferem.",
      path: ["confirmPassword"],
    })
    .transform((data) => data.password);

  static changePasswordSchema = z
    .object({
      currentPassword: z.preprocess(
        (value) => this.checkString(value),
        z
          .string()
          .nonempty({ error: "A senha é obrigatória." })
          .regex(
            passwordRegex,
            "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial."
          )
      ),
      newPassword: z.preprocess(
        (value) => this.checkString(value),
        z
          .string()
          .nonempty({ error: "A senha é obrigatória." })
          .regex(
            passwordRegex,
            "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial."
          )
      ),
      confirmPassword: z.preprocess((value) => this.checkString(value), z.string()),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      error: "A senha e a confirmação de senha não conferem.",
      path: ["confirmPassword"],
    })
    .transform((data) => data.newPassword);
}
