export enum Charset {
  ISO_8859_1 = "ISO-8859-1",
  US_ASCII = "US-ASCII",
  UTF_16 = "UTF-16",
  UTF_16BE = "UTF-16BE",
  UTF_16LE = "UTF-16LE",
  UTF_32 = "UTF-32",
  UTF_32BE = "UTF-32BE",
  UTF_32LE = "UTF-32LE",
  UTF_8 = "UTF-8",
}

export function toCharset(str: string): Charset {
  switch (str) {
    case Charset.ISO_8859_1:
      return Charset.ISO_8859_1;
    case Charset.US_ASCII:
      return Charset.US_ASCII;
    case Charset.UTF_16:
      return Charset.UTF_16;
    case Charset.UTF_16BE:
      return Charset.UTF_16BE;
    case Charset.UTF_16LE:
      return Charset.UTF_16LE;
    case Charset.UTF_32:
      return Charset.UTF_32;
    case Charset.UTF_32BE:
      return Charset.UTF_32BE;
    case Charset.UTF_32LE:
      return Charset.UTF_32LE;
    case Charset.UTF_8:
      return Charset.UTF_8;
    default:
      throw new Error("Unknown resource");
  }
}
