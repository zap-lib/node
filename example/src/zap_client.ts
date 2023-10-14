import dgram from 'node:dgram';

class ZapClient {
  private socket: dgram.Socket;

  constructor() {
    this.socket = dgram.createSocket('udp4');

    this.socket.on('error', (err) => {
      console.error(err);
      this.socket.close();
    });
  }

  send(value: string) {
    this.socket.send(value, 0, value.length, this.PORT, this.IP);
  }

  stop() {
    this.socket.close();
  }

  private IP = '192.168.0.27';
  private PORT = 65500;
}

export default ZapClient;
