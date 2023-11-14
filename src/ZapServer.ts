import * as dgram from "node:dgram";

import { ZapDatagram, ZappHeader } from "./models";
import { ZapAccelerometer, ZapUiEvent, ZapResource, ZapText } from "./resources";

/**
 * Meta information of received ZAPP Object.
 *
 * @property dgram Datagram information such as address and port.
 * @property header ZAPP header object.
 */
export interface MetaInfo {
  dgram: dgram.RemoteInfo,
  header: ZappHeader,
}

/**
 * A server that receives data from client.
 */
export class ZapServer {
  private DEFAULT_PORT = 65500;

  private port: number = this.DEFAULT_PORT;

  private socket: dgram.Socket;

  constructor() {
    this.socket = dgram.createSocket("udp4");

    this.socket.on("error", () => {
      this.socket.close();
    });

    this.socket.on("message", (msg, rinfo) => {
      const { header, payload } = ZapDatagram.from(msg);
      const info = { dgram: rinfo, header };

      switch (header.resource) {
        case ZapResource.ACCELEROMETER: {
          this.onAccelerometerChanged(info, ZapAccelerometer.from(payload));
          break;
        }
        case ZapResource.UI_EVENT: {
          this.onUiEventReceived(info, ZapUiEvent.from(payload));
          break;
        }
        case ZapResource.TEXT: {
          this.onTextReceived(info, ZapText.from(payload));
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
   * @param port A port number for receiving data (default: 65500).
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
  onAccelerometerChanged(_info: MetaInfo, _data: ZapAccelerometer) {
    throw new Error("Not yet implemented");
  }

  /**
   * A callback function called whenever UI event data is received.
   */
  onUiEventReceived(_info: MetaInfo, _data: ZapUiEvent) {
    throw new Error("Not yet implemented");
  }

  /**
   * A callback function called whenever text data is received.
   */
  onTextReceived(_info: MetaInfo, _data: ZapText) {
    throw new Error("Not yet implemented");
  }
}
