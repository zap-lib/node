import { ZappPayload, Zapable, TypeSizeBytes } from "../models";
import { ZapResource } from ".";

/**
 * Represent values measured by accelerometer sensor.
 *
 * ```text
 * +-------------+-------------+-------------+
 * | x (32 bits) | y (32 bits) | z (32 bits) |
 * +-------------+-------------+-------------+
 * ```
 *
 * @property x Acceleration force along the x axis. (m/s²)
 * @property y Acceleration force along the y axis. (m/s²)
 * @property z Acceleration force along the z axis. (m/s²)
 */
export class ZapAccelerometer implements Zapable {
  resource = ZapResource.ACCELEROMETER;

  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toPayload(): ZappPayload {
    const buf = Buffer.alloc(ZapAccelerometer.LENGTH);

    buf.writeFloatBE(this.x);
    buf.writeFloatBE(this.y, TypeSizeBytes.FLOAT);
    buf.writeFloatBE(this.z, TypeSizeBytes.FLOAT * 2);

    return buf;
  }

  static LENGTH = TypeSizeBytes.FLOAT * 3;

  static from(payload: ZappPayload): ZapAccelerometer {
    const x = payload.readFloatBE();
    const y = payload.readFloatBE(TypeSizeBytes.FLOAT);
    const z = payload.readFloatBE(TypeSizeBytes.FLOAT * 2);

    return new ZapAccelerometer(x, y, z);
  }
}
