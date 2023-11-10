export enum ZapResource {
  ACCELEROMETER = "ACC",
  UI_COMPONENT = "UIC",
}

export function toZapResource(str: string): ZapResource {
  switch (str) {
    case ZapResource.ACCELEROMETER:
      return ZapResource.ACCELEROMETER;
    case ZapResource.UI_COMPONENT:
      return ZapResource.UI_COMPONENT;
    default:
      throw new Error("Unknown resource");
  }
}
