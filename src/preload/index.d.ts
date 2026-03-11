import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electronAPI: {
      readConfigDirectory: () => Promise<string[]>
    }
    electron: ElectronAPI
    api: unknown
  }
}
