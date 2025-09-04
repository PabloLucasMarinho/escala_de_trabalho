import type { Request, Response } from "express";
import { z } from "zod";
import { UserRepository } from "../../repositories/UserRepository.js";
import { PasswordService } from "../../services/PasswordService.js";
import { AuthService } from "../../services/AuthService.js";
import { RegisterUserUseCase } from "../../../application/useCases/user/RegisterUserUseCase.js";
import { LoginUserUseCase } from "../../../application/useCases/user/LoginUserUseCase.js";
import { GetUserByTokenUseCase } from "../../../application/useCases/user/GetUserByTokenUseCase.js";
import { GetUserByIdUseCase } from "../../../application/useCases/user/GetUserByIdUseCase.js";
import { UpdateUserUseCase } from "../../../application/useCases/user/UpdateUserUseCase.js";
import { UserSchemas } from "../../../shared/communication/schemas/UserSchemas.js";

const userRepository = new UserRepository();
const passwordService = new PasswordService();
const authService = new AuthService();
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  passwordService
);
const loginUserUseCase = new LoginUserUseCase(userRepository, passwordService);
const getUserByTokenUseCase = new GetUserByTokenUseCase(
  userRepository,
  authService
);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(
  userRepository,
  passwordService
);

export default class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      // Validação dos dados
      const validatedData = UserSchemas.validateRegister(req.body);

      // Cria o usuário no bd
      const newUser = await registerUserUseCase.execute(validatedData);

      // Devolve resposta com token
      const token = authService.create(newUser);
      res.status(200).json({
        message: "Você está autenticado.",
        token: token,
        userId: newUser.id,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(422).json({
          message: "Erro de validação",
          errors: error.issues.map((issue) => issue.message),
        });
        return;
      }

      if (error instanceof Error) {
        res.status(422).json({
          message: error.message,
        });
        return;
      }

      res.status(500).json({ message: "Ocorreu um erro interno:", error });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Validação dos dados
      const validatedData = UserSchemas.validateLogin(req.body);

      // Resgata o usuário do bd
      const user = await loginUserUseCase.execute(validatedData);

      // Devolve resposta com token
      const token = authService.create(user);
      res.status(200).json({
        message: "Você está autenticado.",
        token: token,
        userId: user.id,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(422).json({
          message: "Erro de validação:",
          errors: error.issues.map((issue) => issue.message),
        });
        return;
      }

      if (error instanceof Error) {
        res.status(422).json({
          message: error.message,
        });
        return;
      }

      res.status(500).json({ message: error });
    }
  }

  static async getUserByToken(req: Request, res: Response): Promise<void> {
    const token = authService.getToken(req);

    try {
      const user = await getUserByTokenUseCase.execute(token!);

      if (!user) {
        res.status(404).send(null);
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
      const user = await getUserByIdUseCase.execute(id);

      res.status(200).json({ user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          message: error.message,
        });
        return;
      }

      res.status(500).json({ message: error });
    }
  }

  static async editUser(req: Request, res: Response): Promise<void> {
    try {
      // Resgata o id do usuário
      const id = req.params.id!;

      // Validação dos dados
      const validatedData = UserSchemas.validateUpdate(req.body);

      await updateUserUseCase.execute(validatedData, id);

      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(422).json({
          message: "Erro de validação",
          errors: error.issues.map((issue) => issue.message),
        });
        return;
      }

      if (error instanceof Error) {
        res.status(404).json({
          message: error.message,
        });
        return;
      }

      res.status(500).json({ message: "Ocorreu um erro interno:", error });
    }
  }
}
