import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../../../domain/entities/User.js";
import "dotenv/config";

// Pegar usuário pelo token
const getUserByToken = async (token: string) => {
  const secret: string = process.env.JWT_SECRET!;
  const decoded = jwt.verify(token, secret);

  // const userId = decoded.id;
};

export default getUserByToken;
