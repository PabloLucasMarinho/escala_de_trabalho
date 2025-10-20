import type ResponseTokensJson from "./ResponseTokensJson.js";

export default class ResponseRegisteredUserJson {
  public id: string = String();
  public name: string = String();
  public token: ResponseTokensJson = Object();
}
