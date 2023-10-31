import * as dgram from "node:dgram";

import { ZapData, ZapResource } from "./models";

class ZapServer {
  private socket: dgram.Socket;
  private id = "unknown";

  constructor() {
    this.socket = dgram.createSocket("udp4");

    this.socket.on("error", () => {
      this.socket.close();
    });

    this.socket.on("message", (msg) => {
      const res: ZapData = JSON.parse(msg.toString());
      switch (res.t) {
        case ZapResource.ACCELEROMETER: {
          const [x, y] = res.v.split(",");
          if (x && y) this.onAccelerometerChanged(this.id, x, y);
          break;
        }
        default:
          throw new Error(`Unknown resource type: ${res.t}`);
      }
    });
  }

  start() {
    this.socket.bind(this.PORT);
  }

  stop() {
    this.socket.close();
  }

  onAccelerometerChanged(_id: string, _x: string, _y: string) {
    throw new Error("Not yet implemented");
  }

  private PORT = 65500;
}

export default ZapServer;
