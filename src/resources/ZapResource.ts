export enum ZapResource {
  ACCELEROMETER = "ACC"
}

export function toZapResource(str: string): ZapResource {
  switch (str) {
    case ZapResource.ACCELEROMETER:
      return ZapResource.ACCELEROMETER;
    default:
      throw new Error("Unknown resource");
  }
}
