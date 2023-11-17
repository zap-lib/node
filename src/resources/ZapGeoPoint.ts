import { ZappPayload, Zapable, TypeSizeBytes } from "../models";
import { ZapResource } from ".";

/**
 * Represent a point on earth in geological coordinates.
 *
 * ```text
 * +--------------------+---------------------+
 * | latitude (64 bits) | longitude (64 bits) |
 * +--------------------+---------------------+
 * ```
 */
export class ZapGeoPoint implements Zapable {
  resource = ZapResource.GEO_POINT;

  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  toPayload(): ZappPayload {
    const buf = Buffer.alloc(ZapGeoPoint.LENGTH);

    buf.writeDoubleBE(this.latitude);
    buf.writeDoubleBE(this.longitude, TypeSizeBytes.DOUBLE);

    return buf;
  }

  static LENGTH = TypeSizeBytes.DOUBLE * 2;

  static from(payload: ZappPayload): ZapGeoPoint {
    const lat = payload.readDoubleBE();
    const lon = payload.readDoubleBE(TypeSizeBytes.DOUBLE);

    return new ZapGeoPoint(lat, lon);
  }
}
