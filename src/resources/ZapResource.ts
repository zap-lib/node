export enum ZapResource {
  ACCELEROMETER = 10,
  UI_EVENT = 20,
  TEXT = 30,
}

/**
 * A registry of resources supported by Zap and their identification keys.
 */
export function toZapResource(key: number): ZapResource {
  switch (key) {
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
