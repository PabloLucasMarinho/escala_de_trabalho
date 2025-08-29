import type { Request, Response } from "express";
import { z } from "zod";
import {
  EditUserSchema,
  LoginUserSchema,
  RegisterUserSchema,
} from "../../../shared/communication/schemas/UserSchemas.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../../domain/entities/User.js";
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import "dotenv/config";

export default class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      // Validação dos dados
      const validatedData = RegisterUserSchema.parse(req.body);

      // Dados já validados
      const { name, email, password } = validatedData;

      // Checa se o usuário já está cadastrado
      const userExists = await User.findOne({ email: email });

      if (userExists) {
        res.status(422).json({
          message: "Já existe uma conta cadastrada com esse e-mail.",
        });
        return;
      }

      // Criando a senha para salvar no bd
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      // Create a user
      const user = new User({
        name,
        email,
        password: passwordHash,
      });

      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(422).json({
          message: "Erro de validação",
          errors: error.issues.map((issue) => issue.message),
        });
        return;
      }

      res.status(500).json({ message: "Ocorreu um erro interno:", error });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Validação dos dados
      const validatedData = LoginUserSchema.parse(req.body);

      // Dados já validados
      const { email, password } = validatedData;

      // Checa se o usuário NÃO tem cadastro
      const user = await User.findOne({ email: email });

      if (!user) {
        res.status(422).json({
          message: "E-mail ou senha inválidos.",
        });
        return;
      }

      // Checa se a senha bate com senha salva no bd
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        res.status(422).json({
          message: "E-mail ou senha inválidos.",
        });
        return;
      }

      await createUserToken(user, req, res);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(422).json({
          message: "Erro de validação:",
          errors: error.issues.map((issue) => issue.message),
        });
        return;
      }

      res.status(500).json({ message: error });
    }
  }

  static async checkUser(req: Request, res: Response): Promise<void> {
    let currentUser;

    // Verificação da autenticação
    const token = getToken(req);
    if (!token) {
      res.status(401).send(null);
      return;
    }

    try {
      const secret: string = process.env.JWT_SECRET!;

      // Decodificação do token
      const decoded = jwt.verify(token, secret);

      // Verificação do tipo de payload
      if (typeof decoded !== "object" || !("id" in decoded)) {
        res.status(401).json({ message: "Token inválido ou corrompido." });
        return;
      }

      const userId = (decoded as JwtPayload).id;
      const currentUser = await User.findById(userId);

      // Verificação da existência do usuário
      if (currentUser) {
        // Converte o objeto Moongoose para um objeto Javascript simples
        const userObject = currentUser.toObject();

        // Desestrutura e remove a propriedade 'password'
        const { password, ...userWithoutPassword } = userObject;

        res.status(200).send(userWithoutPassword);
      } else {
        res.status(404).send(null);
        return;
      }
    } catch (error) {
      // Trata todos os erros
      res
        .status(401)
        .json({ message: "Token de autenticação inválido ou expirado." });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({
        message: "Usuário não encontrado.",
      });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req: Request, res: Response): Promise<void> {
    try {
      // Validação dos dados
      const validatedData = EditUserSchema.parse(req.body);

      const { name, email, password, confirmPassword } = req.body;

      const id = req.params._id;

      // Verifica se o usuário existe
      const user = await User.findById(id);
      if (!user) {
        res.status(422).json({
          message: "Usuário não encontrado!",
        });
        return;
      }

      // Verifica se o e-mail já esta cadastrado para outro usuário
      const userExists = await User.findOne({ email });
      if (user?.email !== email && userExists) {
        res.status(422).json({
          message: "Já existe um usuário cadastrado com esse e-mail.",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(422).json({
          message: "Erro de validação",
          errors: error.issues.map((issue) => issue.message),
        });
        return;
      }

      res.status(500).json({ message: "Ocorreu um erro interno:", error });
    }
  }
}
