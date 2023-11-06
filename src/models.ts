export type ZapString = string;

export interface ZapData {
  uuid: string;
}

export class ZapAccelerometerData implements ZapData {
  uuid: string;

  x: number;
  y: number;

  constructor(uuid: string, x: number, y: number) {
    this.uuid = uuid;
    this.x = x;
    this.y = y;
  }
}

export enum ZapResource {
  ACCELEROMETER = "ACC",
}
