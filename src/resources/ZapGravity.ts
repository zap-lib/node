import { ZappPayload, Zapable, TypeSizeBytes } from "../models";
import { ZapResource } from ".";

/**
 * Represent the force of gravity that is applied to a device.
 *
 * ```text
 * +-------------+-------------+-------------+
 * | x (32 bits) | y (32 bits) | z (32 bits) |
 * +-------------+-------------+-------------+
 * ```
 *
 * @property x Force of gravity along the x axis. (m/s²)
 * @property y Force of gravity along the y axis. (m/s²)
 * @property z Force of gravity along the z axis. (m/s²)
 */
export class ZapGravity implements Zapable {
  resource = ZapResource.GRAVITY;

  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toPayload(): ZappPayload {
    const buf = Buffer.alloc(ZapGravity.LENGTH);

    buf.writeFloatBE(this.x);
    buf.writeFloatBE(this.y, TypeSizeBytes.FLOAT);
    buf.writeFloatBE(this.z, TypeSizeBytes.FLOAT * 2);

    return buf;
  }

  static LENGTH = TypeSizeBytes.FLOAT * 3;

  static from(payload: ZappPayload): ZapGravity {
    const x = payload.readFloatBE();
    const y = payload.readFloatBE(TypeSizeBytes.FLOAT);
    const z = payload.readFloatBE(TypeSizeBytes.FLOAT * 2);

    return new ZapGravity(x, y, z);
  }
}
