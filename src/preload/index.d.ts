import { ElectronAPI } from '@electron-toolkit/preload'
import DirApi from './DirApi'
import MusicMetadataApi from './MusicMetadataApi'
import DatabaseApi from './DatabaseApi'

declare global {
  interface Window {
    electron: ElectronAPI,
    dirApi: DirApi,
    musicMetadataApi: MusicMetadataApi,
    databaseApi: DatabaseApi
  }
}
