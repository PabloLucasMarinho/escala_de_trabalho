import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../../domain/entities/User.js";

export default class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, confirmPassword } = req.body;

    // Validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório." });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório." });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória." });
      return;
    }

    if (!confirmPassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória." });
      return;
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({
        message: "Já existe uma conta cadastrada com esse e-mail.",
      });
      return;
    }

    // Create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a user
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      res.status(201).json({
        message: "Usuário criado.",
        newUser,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
