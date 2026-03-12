import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

// readConfigDirectory: renderer -> main (two-way)
// onGbaRoms: main -> renderer (one-way)
// loadGbaRom: renderer -> main (one-way)
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      readConfigDirectory: () => ipcRenderer.invoke('cmd:readConfigDirectory'),
      onGbaRoms: (callback) => ipcRenderer.on('gba-roms', (_event, value) => callback(value)),
      onControllerInput: (callback) => ipcRenderer.on('mocha:command', (_event, value) => callback(value)),
      loadGbaRom: (path: string) => ipcRenderer.invoke('cmd:loadRom', path)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
