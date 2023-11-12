import { ZapResource, toZapResource } from "../resources";

export class ZapHeader {
  id: string;
  resource: ZapResource;

  constructor(id: string, resource: ZapResource) {
    this.id = id;
    this.resource = resource;
  }

  /**
   * Convert `ZapHeader` to string and return it. It MUST be formatted as `id,resource`.
   */
  toString(): string {
    return `${this.id},${this.resource}`;
  }
}

export type ZapPayload = string;

/**
 * A protocol defined on top of datagrams for client and
 * server to exchange `Zapable` data.
 */
export class ZapDatagram {
  header: ZapHeader;
  payload: ZapPayload;

  constructor(header: ZapHeader, payload: ZapPayload) {
    this.header = header;
    this.payload = payload;
  }

  /**
   * Compose a string to send with the header and payload.
   * The composed string MUST be formatted to `header;payload`.
   */
  toString(): string {
    return `${this.header.toString()};${this.payload}`;
  }

  /**
   * Convert the given string in received datagram to `ZapDatagram`.
   */
  static from(str: string): ZapDatagram {
    const [header, payload] = str.split(";");
    if (header == undefined) throw Error("Missing header");
    if (payload == undefined) throw Error("Missing payload");

    const [id, resource] = header.split(",");
    if (id == undefined) throw Error("Missing id");
    if (resource == undefined) throw Error("Missing resource");

    return new ZapDatagram(
      new ZapHeader(id, toZapResource(resource)),
      payload,
    );
  }
}
