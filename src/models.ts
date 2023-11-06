export type ZapString = string;

export interface ZapData {}

export class ZapAccelerometerData implements ZapData {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export enum ZapResource {
  ACCELEROMETER = "ACC",
}
