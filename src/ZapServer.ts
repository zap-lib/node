import * as dgram from "node:dgram";

import { Charset, ZapDatagram } from "./models";
import { ZapAccelerometer, ZapUiEvent, ZapResource, ZapUiEventType, ZapText } from "./resources";

/**
 * A server that receives data from client.
 */
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
        case ZapResource.UI_EVENT: {
          const { uiId, event, value } = ZapUiEvent.fromPayload(payload);
          this.onUiEventReceived(header.id, uiId, event, value);
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

  /**
   * Start listening the transmitted data from clients on the given port.
   *
   * @param port - A port number for receiving data (default: 65500).
   */
  listen(port: number = this.DEFAULT_PORT) {
    this.port = port;
    this.socket.bind(this.port);
  }

  /**
   * Stop listening to clients.
   */
  stop() {
    this.socket.close();
  }

  /**
   * A callback function called whenever accelerometer sensor data is received.
   */
  onAccelerometerChanged(_id: string, _x: number, _y: number, _z: number) {
    throw new Error("Not yet implemented");
  }

  /**
   * A callback function called whenever UI event data is received.
   */
  onUiEventReceived(
    _id: string,
    _uiId: string,
    _event: ZapUiEventType,
    _value?: string,
  ) {
    throw new Error("Not yet implemented");
  }

  /**
   * A callback function called whenever text data is received.
   */
  onTextReceived(_id: string, _str: string, _charset: Charset) {
    throw new Error("Not yet implemented");
  }
}

export default ZapServer;
