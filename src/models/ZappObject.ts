import { ZappHeader, ZappPayload } from ".";

/**
 * An object that represents the encoded bytes on a single datagram.
 *
 * ZAPP(Zap Protocol) is network protocol defined on top of UDP datagram,
 * enabling the exchange of 'Zapable' data between client and server.
 * For further details about the protocol, refer to the [ZAPP section in the Zap Documentation](https://zap-lib.github.io/architectures/zap-protocol.html).
 *
 * @property header A header part.
 * @property payload A payload part.
 */
export class ZapDatagram {
  header: ZappHeader;
  payload: ZappPayload;

  constructor(header: ZappHeader, payload: ZappPayload) {
    this.header = header;
    this.payload = payload;
  }

  /**
   * Encode ZappObject to ByteBuffer. The sequence of bytes is MUST encoded as ZAPP Object.
   */
  toBuffer(): Buffer {
    const length = ZappHeader.LENGTH + this.payload.length;
    const buf = Buffer.alloc(length);

    this.header.writeTo(buf);
    this.payload.copy(buf, ZappHeader.LENGTH, 0, this.payload.length);

    return buf;
  }

  /**
   * Decode the given ByteBuffer in received datagram to ZappObject.
   *
   * @param buf A ByteBuffer to convert that MUST be encoded as ZAPP Object.
   */
  static from(buf: Buffer): ZapDatagram {
    const [header, payload] = [
      ZappHeader.from(buf.subarray(0, ZappHeader.LENGTH)),
      buf.subarray(ZappHeader.LENGTH),
    ];

    return new ZapDatagram(header, payload);
  }
}
