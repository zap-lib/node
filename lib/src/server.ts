import * as dgram from "node:dgram";

import { ZapAccelerometerData, toZapData } from "./models";

class ZapServer {
  private socket: dgram.Socket;
  private id = "unknown";

  constructor() {
    this.socket = dgram.createSocket("udp4");

    this.socket.on("error", () => {
      this.socket.close();
    });

    this.socket.on("message", (msg) => {
      const data = toZapData(msg.toString());
      switch (data.constructor) {
        case ZapAccelerometerData: {
          const acc = <ZapAccelerometerData>data;
          this.onAccelerometerChanged(this.id, acc.x, acc.y);
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

  onAccelerometerChanged(_id: string, _x: number, _y: number) {
    throw new Error("Not yet implemented");
  }

  private PORT = 65500;
}

export default ZapServer;
