import { ipcMain } from "electron";
import * as fs from 'fs'

function readConfigDirectory() {
      const files = fs.readdirSync('/home/hazy/.config/latte');
      return files;
}

export function setIpcFuncs() {
      ipcMain.on('ping', () => console.log('pong'));
      ipcMain.handle('cmd:readConfigDirectory', readConfigDirectory)
}