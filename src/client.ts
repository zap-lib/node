import * as dgram from "node:dgram";
import { v4 as uuidv4 } from "uuid";

import { ZapAccelerometerData, ZapData, ZapResource, ZapString } from "./models";

class ZapClient {
  uuid = uuidv4();

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
    const zapString = this.toZapString(data);
    this.socket.send(zapString, 0, zapString.length, this.PORT, this.serverAddress);
  }

  stop() {
    this.socket.close();
  }

  private toZapString(data: ZapData): ZapString {
    const dataPart = () => {
      switch (data.constructor) {
        case ZapAccelerometerData: {
          const acc = <ZapAccelerometerData>data;
          return `${ZapResource.ACCELEROMETER};${acc.x},${acc.y}`;
        }
        default: throw new Error("Unknown Zap resource");
      }
    };

    return `${this.uuid};${dataPart()}`;
  }

  private PORT = 65500;
}

export default ZapClient;
