import { ZapResource, toZapResource } from "../resources";

/**
 * A header part of ZappObject.
 *
 * @property resource A resource type of the payload. It indicates a format of payload.
 * @property timestamp An epoch time in milliseconds for creation time of ZappObject. (default: Current epoch)
 */
export class ZappHeader {
  timestamp: number;
  resource: ZapResource;

  private static TIMESTAMP_LENGTH = 8; // 8 bytes for timestamp field.
  private static RESOURCE_LENGTH = 1; // 1 byte for resource field.
  static LENGTH = this.TIMESTAMP_LENGTH + this.RESOURCE_LENGTH;

  constructor(resource: ZapResource, timestamp: number = Date.now()) {
    this.timestamp = timestamp;
    this.resource = resource;
  }

  /**
   * Write ZappHeader to given ByteBuffer and return it.
   * The given ByteBuffer MUST be encoded as ZAPP Header.
   */
  writeTo(buf: Buffer): Buffer {
    buf.writeBigUInt64BE(BigInt(this.timestamp), 0);
    buf.writeUInt8(this.resource, ZappHeader.TIMESTAMP_LENGTH);

    return buf;
  }

  /**
   * Read bytes from the given ByteBuffer and decode it to ZappHeader.
   */
  static from(buf: Buffer): ZappHeader {
    const timestamp = Number(buf.readBigUInt64BE(0));
    const resource = Number(buf.readUInt8(ZappHeader.TIMESTAMP_LENGTH));

    return new ZappHeader(toZapResource(resource), timestamp);
  }
}
