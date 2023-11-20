export enum ZapResource {
  ACCELEROMETER = 10,
  GRAVITY = 11,
  GYROSCOPE = 12,
  ILLUMINANCE = 13,
  MAGNETIC_FIELD = 14,
  UI_EVENT = 20,
  TEXT = 30,
  GEO_POINT = 31,
}

/**
 * A registry of resources supported by Zap and their identification keys.
 */
export function toZapResource(key: number): ZapResource {
  switch (key) {
    case ZapResource.ACCELEROMETER:
      return ZapResource.ACCELEROMETER;
    case ZapResource.GRAVITY:
      return ZapResource.GRAVITY;
    case ZapResource.GYROSCOPE:
      return ZapResource.GYROSCOPE;
    case ZapResource.ILLUMINANCE:
      return ZapResource.ILLUMINANCE;
    case ZapResource.MAGNETIC_FIELD:
      return ZapResource.MAGNETIC_FIELD;
    case ZapResource.UI_EVENT:
      return ZapResource.UI_EVENT;
    case ZapResource.TEXT:
      return ZapResource.TEXT;
    case ZapResource.GEO_POINT:
      return ZapResource.GEO_POINT;
    default:
      throw new Error("Unknown resource");
  }
}
