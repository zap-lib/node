import { ZappPayload, Zapable } from "../models";
import { ZapResource } from ".";

/**
 * Represent values measured by accelerometer sensor.
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
    return Buffer.from(`${this.x},${this.y},${this.z}`);
  }

  static from(payload: ZappPayload): ZapAccelerometer {
    const [x, y, z] = payload.toString().split(",").map((k) => Number(k));
    if (x == undefined || y == undefined || z == undefined) {
      throw Error("Invalid payload");
    }

    return new ZapAccelerometer(x, y, z);
  }
}
