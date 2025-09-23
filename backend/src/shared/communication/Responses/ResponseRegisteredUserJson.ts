import type ResponseTokensJson from "./ResponseTokensJson.js";

export default class ResponseRegisteredUserJson {
  public name: string = String();
  public token: ResponseTokensJson = Object();
}
