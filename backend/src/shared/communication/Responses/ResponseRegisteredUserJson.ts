import type { ResponseTokensJson } from "./ResponseTokensJson.js";

export class ResponseRegisteredUserJson {
  public name: string = String();

  public token: ResponseTokensJson = Object();
}
