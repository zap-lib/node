export enum ZapResource {
  ACCELEROMETER = "ACC",
  UI_EVENT = "UIE",
  TEXT = "TXT",
}

export function toZapResource(str: string): ZapResource {
  switch (str) {
    case ZapResource.ACCELEROMETER:
      return ZapResource.ACCELEROMETER;
    case ZapResource.UI_EVENT:
      return ZapResource.UI_EVENT;
    case ZapResource.TEXT:
      return ZapResource.TEXT;
    default:
      throw new Error("Unknown resource");
  }
}
