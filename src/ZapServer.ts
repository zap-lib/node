import * as dgram from "node:dgram";

import { ZapDatagram } from "./models";
import { ZapAccelerometer, ZapResource } from "./resources";

class ZapServer {
  private DEFAULT_PORT = 65500;

  private port: number = this.DEFAULT_PORT;

  private socket: dgram.Socket;

  constructor() {
    this.socket = dgram.createSocket("udp4");

    this.socket.on("error", () => {
      this.socket.close();
    });

    this.socket.on("message", (msg) => {
      const { header, payload } = ZapDatagram.from(msg.toString());
      switch (header.resource) {
        case ZapResource.ACCELEROMETER: {
          const { x, y, z } = ZapAccelerometer.fromPayload(payload);
          this.onAccelerometerChanged(header.id, x, y, z);
          break;
        }
        default:
          throw new Error("Unknown resource type");
      }
    });
  }

  listen(port: number = this.DEFAULT_PORT) {
    this.port = port;
    this.socket.bind(this.port);
  }

  stop() {
    this.socket.close();
  }

  onAccelerometerChanged(_id: string, _x: number, _y: number, _z: number) {
    throw new Error("Not yet implemented");
  }
}

export default ZapServer;
