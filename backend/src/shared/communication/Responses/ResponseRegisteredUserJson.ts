import type { ResponseTokensJson } from "./ResponseTokensJson.js";

export class ResponseRegisteredUserJson {
  public Name: string = String();

  public Token: ResponseTokensJson = Object();
}
