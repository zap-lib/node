import * as dgram from "node:dgram";

import { Zapable, ZapDatagram, ZappHeader } from "./models";

/**
 * A client that sends data to server.
 *
 * @property serverAddress An IP address of the device running ZapServer.
 */
export class ZapClient {
  private serverAddress: string;
  private socket: dgram.Socket;

  constructor(serverAddress: string) {
    this.serverAddress = serverAddress;
    this.socket = dgram.createSocket("udp4");

    this.socket.on("error", () => {
      this.socket.close();
    });
  }

  /**
   * Send given Zapable object to the server.
   *
   * @param obj An object to send.
   */
  send(obj: Zapable) {
    const data = new ZapDatagram(
      new ZappHeader(obj.resource),
      obj.toPayload(),
    ).toBuffer();

    this.socket.send(data, 0, data.length, this.PORT, this.serverAddress);
  }

  /**
   * Close the socket.
   */
  stop() {
    this.socket.close();
  }

  private PORT = 65500;
}
