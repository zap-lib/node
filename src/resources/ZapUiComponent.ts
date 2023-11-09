import { ZapPayload, Zapable } from "../models";
import { ZapResource } from ".";

export enum ZapUiComponentEvent {
  CLICK_DOWN = "CLICK_DOWN",
  CLICK_PRESS = "CLICK_PRESS",
  CLICK_UP = "CLICK_UP",
}

type ZapUiComponentEventString = keyof typeof ZapUiComponentEvent;

export class ZapUiComponent implements Zapable {
  resource = ZapResource.UI_COMPONENT;

  code: string;
  event: ZapUiComponentEvent;
  value?: string;

  constructor(id: string, event: ZapUiComponentEvent, value?: string) {
    this.code = id;
    this.event = event;
    this.value = value;
  }

  toPayload(): ZapPayload {
    return `${this.code},${this.event}${this.value ?? `,${this.value}`}`;
  }

  static fromPayload(payload: ZapPayload): ZapUiComponent {
    const [id, event, value] = payload.split(",");
    if (id == undefined || event == undefined) {
      throw Error("Invalid payload");
    }

    return new ZapUiComponent(
      id,
      ZapUiComponentEvent[event as ZapUiComponentEventString],
      value,
    );
  }
}
