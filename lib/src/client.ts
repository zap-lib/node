import * as dgram from "node:dgram";

import { ZapData, toZapString } from "./models";

class ZapClient {
  private serverAddress: string;
  private socket: dgram.Socket;

  constructor(serverAddress: string) {
    this.serverAddress = serverAddress;
    this.socket = dgram.createSocket("udp4");

    this.socket.on("error", () => {
      this.socket.close();
    });
  }

  send(data: ZapData) {
    const zapString = toZapString(data);
    this.socket.send(zapString, 0, zapString.length, this.PORT, this.serverAddress);
  }

  stop() {
    this.socket.close();
  }

  private PORT = 65500;
}

export default ZapClient;
