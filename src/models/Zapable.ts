import { ZapPayload } from ".";
import { ZapResource } from "../resources";

export interface Zapable {
  resource: ZapResource;

  toPayload(): ZapPayload
}
