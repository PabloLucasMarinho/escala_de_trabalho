import type { NextFunction, Request, Response } from "express";
import z from "zod";

export const ErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  // Trata erros de validação do Zod
  if (error instanceof z.ZodError) {
    const validationErrors = error.issues.map((issue) => issue.message);

    return res.status(422).json({
      errors: validationErrors,
    });
  }

  // Trata erros de negócio
  if (error instanceof Error) {
    return res.status(422).json({
      error: error.message,
    });
  }

  // Trata erros genéricos
  return res.status(500).json({
    error: "Ocorreu um erro interno no servidor.",
  });
};
