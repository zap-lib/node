export enum ZapResource {
  ACCELEROMETER = "ACC",
  UI_COMPONENT = "UIC",
}

export type ZapResourceString = keyof typeof ZapResource;
