import { ZapPayload } from ".";
import { ZapResource } from "../resources";

/**
 * An interface for data exchange through Zap. Data objects exchanged
 * via Zap MUST implement this interface. If an object can be transmitted
 * through Zap, it can be referred to as “Zapable”.
 */
export interface Zapable {
  resource: ZapResource;

  /**
   * Convert Zapable to ZapPayload and return it.
   */
  toPayload(): ZapPayload
}
