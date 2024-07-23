import { ElectronAPI } from '@electron-toolkit/preload'
import { DirApi } from './DirApi'

declare global {
  interface Window {
    electron: ElectronAPI,
    dirApi: DirApi
  }
}
