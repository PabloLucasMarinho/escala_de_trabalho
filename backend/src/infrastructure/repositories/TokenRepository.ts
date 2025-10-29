import { injectable } from "tsyringe";
import type ITokenRepository from "../../domain/repositories/Token/ITokenRepository.js";
import type IRefreshToken from "../entities/IRefreshToken.js";
import RefreshToken from "../../domain/entities/RefreshToken.js";

@injectable()
export default class TokenRepository implements ITokenRepository {
  async Get(refreshToken: string): Promise<IRefreshToken | null> {
    const query = { value: refreshToken, active: true };

    const token = await RefreshToken.findOne(query);

    return token;
  }

  async SaveNewRefreshToken(refreshToken: IRefreshToken): Promise<void> {
    const query = { userId: refreshToken.userId, active: true };

    await RefreshToken.findOneAndDelete(query);

    await new RefreshToken(refreshToken).save();
  }
}
