import { ZapPayload, Zapable } from "../models";
import { ZapResource } from ".";

export enum ZapUiEventType {
  CLICK_DOWN = "CLICK_DOWN",
  CLICK_PRESS = "CLICK_PRESS",
  CLICK_UP = "CLICK_UP",
}

export type ZapUiEventTypeString = keyof typeof ZapUiEventType;

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

  toPayload(): ZapPayload {
    return `${this.uiId},${this.event}${this.value ?? `,${this.value}`}`;
  }

  static fromPayload(payload: ZapPayload): ZapUiEvent {
    const [uiId, event, value] = payload.split(",");
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
