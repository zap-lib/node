import { ZappPayload, Zapable, TypeSizeBytes } from "../models";
import { ZapResource } from ".";

/**
 * Represent a device's rate of rotation.
 *
 * ```text
 * +-------------+-------------+-------------+
 * | x (32 bits) | y (32 bits) | z (32 bits) |
 * +-------------+-------------+-------------+
 * ```
 *
 * @property x Rate of rotation around the x axis. (rad/s)
 * @property y Rate of rotation around the y axis. (rad/s)
 * @property z Rate of rotation around the z axis. (rad/s)
 */
export class ZapGyroscope implements Zapable {
  resource = ZapResource.GYROSCOPE;

  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toPayload(): ZappPayload {
    const buf = Buffer.alloc(ZapGyroscope.LENGTH);

    buf.writeFloatBE(this.x);
    buf.writeFloatBE(this.y, TypeSizeBytes.FLOAT);
    buf.writeFloatBE(this.z, TypeSizeBytes.FLOAT * 2);

    return buf;
  }

  static LENGTH = TypeSizeBytes.FLOAT * 3;

  static from(payload: ZappPayload): ZapGyroscope {
    const x = payload.readFloatBE();
    const y = payload.readFloatBE(TypeSizeBytes.FLOAT);
    const z = payload.readFloatBE(TypeSizeBytes.FLOAT * 2);

    return new ZapGyroscope(x, y, z);
  }
}
