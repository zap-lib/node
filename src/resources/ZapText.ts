import { ZappPayload, Zapable, TypeSizeBytes } from "../models";
import { ZapResource } from ".";

/**
 * Represent simple text.
 *
 *
 * @property str Just string.
 * @property charset A character set of `str`. (default: UTF-8)
 */
export class ZapText implements Zapable {
  resource = ZapResource.TEXT;

  str: string;
  charset: ZapCharset;

  constructor(str: string, charset = ZapCharset.UTF_8) {
    this.str = str;
    this.charset = charset;
  }

  toPayload(): ZappPayload {
    // FIXME: TextEncoder only supports UTF-8.
    const strSizeBytes = (new TextEncoder()).encode(this.str).length;

    const buf = Buffer.alloc(TypeSizeBytes.BYTE + strSizeBytes);
    buf.writeUInt8(this.charset);
    buf.write(this.str, TypeSizeBytes.BYTE);

    return buf;
  }

  static from(payload: ZappPayload): ZapText {
    const charset = toZapCharset(payload.readUInt8());
    const str = payload.toString(toBufferEncoding(charset), TypeSizeBytes.BYTE);

    return new ZapText(str, charset);
  }
}

export enum ZapCharset {
  UTF_8 = 0,
  UTF_16 = 1,
  UTF_16BE = 2,
  UTF_16LE = 3,
  UTF_32 = 4,
  UTF_32BE = 5,
  UTF_32LE = 6,
  ISO_8859_1 = 7,
  US_ASCII = 8,
}

export function toZapCharset(key: number): ZapCharset {
  switch (key) {
    case ZapCharset.ISO_8859_1:
      return ZapCharset.ISO_8859_1;
    case ZapCharset.US_ASCII:
      return ZapCharset.US_ASCII;
    case ZapCharset.UTF_16:
      return ZapCharset.UTF_16;
    case ZapCharset.UTF_16BE:
      return ZapCharset.UTF_16BE;
    case ZapCharset.UTF_16LE:
      return ZapCharset.UTF_16LE;
    case ZapCharset.UTF_32:
      return ZapCharset.UTF_32;
    case ZapCharset.UTF_32BE:
      return ZapCharset.UTF_32BE;
    case ZapCharset.UTF_32LE:
      return ZapCharset.UTF_32LE;
    case ZapCharset.UTF_8:
      return ZapCharset.UTF_8;
    default:
      throw new Error("Unknown charset");
  }
}

export function toBufferEncoding(charset: ZapCharset): BufferEncoding {
  switch (charset) {
    case ZapCharset.UTF_8:
      return "utf8";
    case ZapCharset.UTF_16LE:
      return "utf16le";
    case ZapCharset.ISO_8859_1:
      return "latin1";
    case ZapCharset.US_ASCII:
      return "ascii";
    case ZapCharset.UTF_16:
    case ZapCharset.UTF_16BE:
    case ZapCharset.UTF_32:
    case ZapCharset.UTF_32BE:
    case ZapCharset.UTF_32LE:
      throw Error("Unsupported encoding");
  }
}
