import * as dgram from "node:dgram";

import { Charset, ZapDatagram } from "./models";
import { ZapAccelerometer, ZapUiComponent, ZapResource, ZapUiComponentEvent, ZapText } from "./resources";

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
        case ZapResource.UI_COMPONENT: {
          const { code, event, value } = ZapUiComponent.fromPayload(payload);
          this.onUiComponentChanged(header.id, code, event, value);
          break;
        }
        case ZapResource.TEXT: {
          const { str, charset } = ZapText.fromPayload(payload);
          this.onTextReceived(header.id, str, charset);
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

  onUiComponentChanged(
    _id: string,
    _code: string,
    _event: ZapUiComponentEvent,
    _value?: string,
  ) {
    throw new Error("Not yet implemented");
  }

  onTextReceived(_id: string, _str: string, _charset: Charset) {
    throw new Error("Not yet implemented");
  }
}

export default ZapServer;
