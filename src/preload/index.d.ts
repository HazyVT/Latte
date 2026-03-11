import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electronAPI: {
      readConfigDirectory: () => Promise<any>
    }
    electron: ElectronAPI
    api: unknown
  }
}
