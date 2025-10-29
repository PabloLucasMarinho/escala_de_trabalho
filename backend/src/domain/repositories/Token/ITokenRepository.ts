import type IRefreshToken from "../../../infrastructure/entities/IRefreshToken.js";

export default interface ITokenRepository {
  Get(refreshToken: string): Promise<IRefreshToken | null>;
  SaveNewRefreshToken(refreshToken: IRefreshToken): Promise<void>;
}
