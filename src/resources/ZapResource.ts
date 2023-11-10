export enum ZapResource {
  ACCELEROMETER = "ACC",
  UI_COMPONENT = "UIC",
  TEXT = "TXT",
}

export function toZapResource(str: string): ZapResource {
  switch (str) {
    case ZapResource.ACCELEROMETER:
      return ZapResource.ACCELEROMETER;
    case ZapResource.UI_COMPONENT:
      return ZapResource.UI_COMPONENT;
    case ZapResource.TEXT:
      return ZapResource.TEXT;
    default:
      throw new Error("Unknown resource");
  }
}
