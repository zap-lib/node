import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import ZapServer from './zap_server';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('start', () => {
  const zap = new class extends ZapServer {
    onAccelerometerChanged(id: string, value: string) {
      console.log(id, value);
    }
  };

  zap.start();
});
