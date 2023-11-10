import { Charset, ZapPayload, Zapable, toCharset } from "../models";
import { ZapResource } from ".";

export class ZapText implements Zapable {
  resource = ZapResource.TEXT;

  str: string;
  charset: Charset;

  constructor(str: string, charset = Charset.UTF_8) {
    this.str = str;
    this.charset = charset;
  }

  toPayload(): ZapPayload {
    return `${this.str},${this.charset}`;
  }

  static fromPayload(payload: ZapPayload): ZapText {
    const [str, charset] = payload.split(",");
    if (str == undefined || charset == undefined) {
      throw Error("Invalid payload");
    }

    return new ZapText(str, toCharset(charset));
  }
}
