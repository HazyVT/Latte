import { BrowserWindow, shell, screen } from "electron";
import icon from '../../resources/icon.png?asset'
import { join } from "path";
import { is } from "@electron-toolkit/utils";

export let window: BrowserWindow;

export function createWindow() {
    
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize
    
      window = new BrowserWindow({
            width: width,
            height: height,
            show: false,
            autoHideMenuBar: true,
            resizable: false,
            fullscreen: true,
            ...(process.platform === 'linux' ? { icon } : {}),
            webPreferences: {
                  preload: join(__dirname, '../preload/index.js'),
                  sandbox: false
            }
      })

      window.on('ready-to-show', () => {
            window.show();
      })

      window.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url);
            return { action: 'deny'}
      })

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            window.loadURL(process.env['ELECTRON_RENDERER_URL']);
      } else {
            window.loadFile(join(__dirname, '../renderer/index.html'))
      }
}