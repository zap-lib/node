import { ZappPayload, Zapable, TypeSizeBytes } from "../models";
import { ZapResource } from ".";

/**
 * Represent a ambient geomagnetic field.
 *
 * ```text
 * +-------------+-------------+-------------+
 * | x (32 bits) | y (32 bits) | z (32 bits) |
 * +-------------+-------------+-------------+
 * ```
 *
 * @property x Geomagnetic field strength along the x axis. (μT)
 * @property y Geomagnetic field strength along the y axis. (μT)
 * @property z Geomagnetic field strength along the z axis. (μT)
 */
export class ZapMagneticField implements Zapable {
  resource = ZapResource.MAGNETIC_FIELD;

  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toPayload(): ZappPayload {
    const buf = Buffer.alloc(ZapMagneticField.LENGTH);

    buf.writeFloatBE(this.x);
    buf.writeFloatBE(this.y, TypeSizeBytes.FLOAT);
    buf.writeFloatBE(this.z, TypeSizeBytes.FLOAT * 2);

    return buf;
  }

  static LENGTH = TypeSizeBytes.FLOAT * 3;

  static from(payload: ZappPayload): ZapMagneticField {
    const x = payload.readFloatBE(0);
    const y = payload.readFloatBE(TypeSizeBytes.FLOAT);
    const z = payload.readFloatBE(TypeSizeBytes.FLOAT * 2);

    return new ZapMagneticField(x, y, z);
  }
}
