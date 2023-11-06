import * as dgram from "node:dgram";

import { ZapAccelerometerData, ZapData, ZapResource, ZapString } from "./models";

interface ZapDataFromClient {
  uuid: string;
  data: ZapData;
}

class ZapServer {
  private socket: dgram.Socket;

  constructor() {
    this.socket = dgram.createSocket("udp4");

    this.socket.on("error", () => {
      this.socket.close();
    });

    this.socket.on("message", (msg) => {
      const received = this.toZapData(msg.toString());
      switch (received.data.constructor) {
        case ZapAccelerometerData: {
          const accData = <ZapAccelerometerData>received.data;
          this.onAccelerometerChanged(received.uuid, accData.x, accData.y);
          break;
        }
        default:
          throw new Error("Unknown resource type");
      }
    });
  }

  start() {
    this.socket.bind(this.PORT);
  }

  stop() {
    this.socket.close();
  }

  onAccelerometerChanged(_uuid: string, _x: number, _y: number) {
    throw new Error("Not yet implemented");
  }

  private toZapData(str: ZapString): ZapDataFromClient {
    const [uuid, resource, value] = str.split(";");
    if (uuid && resource && value) {
      switch (resource) {
        case ZapResource.ACCELEROMETER: {
          const [x, y] = value.split(",").map((k) => Number(k));
          if (x !== undefined && y !== undefined) {
            return { uuid, data: new ZapAccelerometerData(x, y) };
          }
          throw new Error(`Invalid ZapString for ${ZapResource.ACCELEROMETER}`);
        }
      }
    }

    throw new Error("Unknown Zap resource");
  }

  private PORT = 65500;
}

export default ZapServer;
