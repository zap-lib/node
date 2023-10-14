import dgram from 'node:dgram';

class ZapServer {
  private socket: dgram.Socket;
  private id = 'unknown';

  constructor() {
    this.socket = dgram.createSocket('udp4');

    this.socket.on('error', (err) => {
      console.error(err);
      this.socket.close();
    });

    this.socket.on('message', (msg, _) => {
      // TODO: Check the resource type
      this.onAccelerometerChanged(this.id, msg.toString());
    });
  }

  start() {
    this.socket.bind(this.PORT);
  }

  stop() {
    this.socket.close();
  }

  onAccelerometerChanged(_id: string, _value: string) {
    console.warn("Not yet implemented");
  }

  private PORT = 65500;
}

export default ZapServer;
