import { ZappPayload, Zapable } from "../models";
import { ZapResource } from ".";

export enum ZapUiEventType {
  CLICK = "CLICK",
  CLICK_DOWN = "CLICK_DOWN",
  CLICK_UP = "CLICK_UP",
}

export type ZapUiEventTypeString = keyof typeof ZapUiEventType;

/**
 * Represent data related to event raised by the user interface.
 *
 * @property uiId An identifier for the UI.
 * @property event A type of event occurring for the UI.
 * @property value A value changed due to the event.
 */
export class ZapUiEvent implements Zapable {
  resource = ZapResource.UI_EVENT;

  uiId: string;
  event: ZapUiEventType;
  value?: string;

  constructor(id: string, event: ZapUiEventType, value?: string) {
    this.uiId = id;
    this.event = event;
    this.value = value;
  }

  toPayload(): ZappPayload {
    return Buffer.from(`${this.uiId},${this.event}${this.value ?? `,${this.value}`}`);
  }

  static from(payload: ZappPayload): ZapUiEvent {
    const [uiId, event, value] = payload.toString().split(",");
    if (uiId == undefined || event == undefined) {
      throw Error("Invalid payload");
    }

    return new ZapUiEvent(
      uiId,
      ZapUiEventType[event as ZapUiEventTypeString],
      value,
    );
  }
}
