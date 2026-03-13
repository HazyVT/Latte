import { BrowserWindow, shell, screen, app } from "electron";
import icon from '../../resources/icon.png?asset'
import { join } from "path";
import { is } from "@electron-toolkit/utils";
import { spawn } from 'child_process'

export let window: BrowserWindow;

// Variables to track controller support
let isWindowFocused = false;

export function createWindow() {
    
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize
    
      window = new BrowserWindow({
            width: width,
            height: height,
            show: false,
            autoHideMenuBar: true,
            resizable: false,
            fullscreen: false,
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

      // Spawn mocha to get controller inputs
      const mochaFile = app.isPackaged ? join(process.resourcesPath, 'mocha') : './mocha/mocha'
      const mocha = spawn(mochaFile);
      
      mocha.stdout.on('data', (data) => {
          //console.log(data.toString());
          if (isWindowFocused) {
              if (data.toString() != "START") {
                  window.webContents.send('mocha:command', data.toString());
              } else {
                  // DEBUG CLOSE BUTTON FOR NOW
                  app.quit()
              }
          }
      })

      window.on('focus', () => {
          isWindowFocused = true;
      })

      window.on('blur', () => {
          isWindowFocused = false;
      })

      window.on('close', () => {
          if (process.platform !== "darwin") {
              const dead = mocha.kill();
              console.log(dead);
          }
      })

}