import * as dgram from "node:dgram";
import { v4 as uuidv4 } from "uuid";

import { Zapable, ZapDatagram, ZapHeader } from "./models";

/**
 * A client sends data to server.
 */
class ZapClient {
  id = uuidv4();

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
   * @param obj - An object to send.
   */
  send(obj: Zapable) {
    const data = new ZapDatagram(
      new ZapHeader(this.id, obj.resource),
      obj.toPayload(),
    ).toString();

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

export default ZapClient;
