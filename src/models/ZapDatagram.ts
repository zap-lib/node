import { ZapResource, ZapResourceString } from "../resources";

export class ZapHeader {
  id: string;
  resource: ZapResource;

  constructor(id: string, resource: ZapResource) {
    this.id = id;
    this.resource = resource;
  }

  toString(): string {
    return `${this.id},${this.resource}`;
  }
}

export type ZapPayload = string;

export class ZapDatagram {
  header: ZapHeader;
  payload: ZapPayload;

  constructor(header: ZapHeader, payload: ZapPayload) {
    this.header = header;
    this.payload = payload;
  }

  toString(): string {
    return `${this.header.toString()};${this.payload}`;
  }

  static from(str: string): ZapDatagram {
    const [header, payload] = str.split(";");
    if (header == undefined) throw Error("Missing header");
    if (payload == undefined) throw Error("Missing payload");

    const [id, resource] = header.split(",");
    if (id == undefined) throw Error("Missing id");
    if (resource == undefined) throw Error("Missing resource");

    return new ZapDatagram(
      new ZapHeader(id, ZapResource[resource as ZapResourceString]),
      payload,
    );
  }
}
