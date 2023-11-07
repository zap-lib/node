import { ZapPayload, Zapable } from "../models";
import { ZapResource } from ".";

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

  toPayload(): ZapPayload {
    return `${this.x},${this.y},${this.z}`;
  }

  static fromPayload(payload: ZapPayload): ZapAccelerometer {
    const [x, y, z] = payload.split(",").map((k) => Number(k));
    if (x == undefined || y == undefined || z == undefined) {
      throw Error("Invalid payload");
    }

    return new ZapAccelerometer(x, y, z);
  }
}
