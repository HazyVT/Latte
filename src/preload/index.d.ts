import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electronAPI: {
      readConfigDirectory: () => Promise<any>,
      onGbaRoms(callback: (value: string[]) => void): void,
      onControllerInput(callback: (value: string) => void): void,
      loadGbaRom(value: string) : void
    }
    electron: ElectronAPI
    api: unknown
  }
}
