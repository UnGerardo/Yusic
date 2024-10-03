import { ElectronAPI } from '@electron-toolkit/preload'
import Api from './Api'
import MusicMetadataApi from './MusicMetadataApi'
import DatabaseApi from './DatabaseApi'

declare global {
  interface Window {
    electron: ElectronAPI,
    api: Api,
    musicMetadataApi: MusicMetadataApi,
    databaseApi: DatabaseApi
  }
}
