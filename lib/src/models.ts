type ZapString = string;

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

export function toZapString(data: ZapData): ZapString {
  switch (data.constructor) {
    case ZapAccelerometerData: {
      const acc = <ZapAccelerometerData>data;
      return `${ZapResource.ACCELEROMETER};${acc.x},${acc.y}`;
    }
    default: throw new Error("Unknown Zap resource");
  }
}

export function toZapData(str: ZapString): ZapData {
  const splitted = str.split(";");
  if (splitted[0] && splitted[1]) {
    switch (splitted[0]) {
      case ZapResource.ACCELEROMETER: {
        const [x, y] = splitted[1].split(",").map((k) => Number(k));
        if (x !== undefined && y !== undefined) return new ZapAccelerometerData(x, y);
        throw new Error(`Invalid ZapString for ${ZapResource.ACCELEROMETER}`);
      }
    }
  }

  throw new Error("Unknown Zap resource");
}
