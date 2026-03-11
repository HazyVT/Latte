import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electronAPI: {
      readConfigDirectory: () => Promise<any>,
      onGbaRoms(callback: (value: string[]) => void): void,
      loadGbaRom(callback: (value: string) => void) : void
    }
    electron: ElectronAPI
    api: unknown
  }
}
