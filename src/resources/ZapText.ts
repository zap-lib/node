import { Charset, ZappPayload, Zapable, toCharset } from "../models";
import { ZapResource } from ".";

/**
 * Represent simple text.
 *
 * @property str Just string.
 * @property charset A character set of [str]. (default: UTF-8)
 */
export class ZapText implements Zapable {
  resource = ZapResource.TEXT;

  str: string;
  charset: Charset;

  constructor(str: string, charset = Charset.UTF_8) {
    this.str = str;
    this.charset = charset;
  }

  toPayload(): ZappPayload {
    return Buffer.from(`${encodeURIComponent(this.str)},${this.charset}`);
  }

  static from(payload: ZappPayload): ZapText {
    const [str, charset] = payload.toString().split(",");
    if (str == undefined || charset == undefined) {
      throw Error("Invalid payload");
    }

    return new ZapText(decodeURIComponent(str), toCharset(charset));
  }
}
