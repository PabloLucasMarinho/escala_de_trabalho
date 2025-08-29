import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const RegisterUserSchema = z
  .object({
    name: z.string().nonempty({ message: "O nome é obrigatório." }).trim(),
    email: z
      .email({ message: "O e-mail fornecido é inválido." })
      .nonempty({ message: "O e-mail é obrigatório." })
      .trim(),
    password: z
      .string()
      .nonempty({ message: "A senha é obrigatória." })
      .regex(passwordRegex, {
        message:
          "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "A confirmação de senha é obrigatória." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A senha e a confirmação de senha não conferem.",
    path: ["confirmPassword"],
  });

export const LoginUserSchema = z.object({
  email: z
    .email({ message: "O e-mail fornecido é inválido." })
    .nonempty({ message: "O e-mail é obrigatório." })
    .trim(),
  password: z.string().nonempty({ message: "A senha é obrigatória." }),
});

export const EditUserSchema = z.object({
  name: z.string().nonempty({ message: "O nome é obrigatório." }).trim(),
  email: z
    .email({ message: "O e-mail fornecido é inválido." })
    .nonempty({ message: "O e-mail é obrigatório." })
    .trim(),
  password: z
    .string()
    .nonempty({ message: "A senha é obrigatória." })
    .regex(passwordRegex, {
      message:
        "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.",
    }),
  confirmPassword: z
    .string()
    .nonempty({ message: "A confirmação de senha é obrigatória." }),
});
