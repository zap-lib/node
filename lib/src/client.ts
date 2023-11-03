import * as dgram from "node:dgram";

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

  send(value: string) {
    this.socket.send(value, 0, value.length, this.PORT, this.serverAddress);
  }

  stop() {
    this.socket.close();
  }

  private PORT = 65500;
}

export default ZapClient;
