import { ipcRenderer } from "electron";

(() => {
  ipcRenderer.send('start');
})();
