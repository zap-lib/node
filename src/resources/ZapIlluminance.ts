import { ZappPayload, Zapable, TypeSizeBytes } from "../models";
import { ZapResource } from ".";

/**
 * Represent the ambient light level.
 *
 * ```text
 * +--------------+
 * | lx (32 bits) |
 * +--------------+
 * ```
 *
 * @property lx ambient light level in lx.
 */
export class ZapIlluminance implements Zapable {
  resource = ZapResource.ILLUMINANCE;

  lx: number;

  constructor(lx: number) {
    this.lx = lx;
  }

  toPayload(): ZappPayload {
    const buf = Buffer.alloc(ZapIlluminance.LENGTH);

    buf.writeFloatBE(this.lx);

    return buf;
  }

  static LENGTH = TypeSizeBytes.FLOAT;

  static from(payload: ZappPayload): ZapIlluminance {
    return new ZapIlluminance(payload.readFloatBE());
  }
}
