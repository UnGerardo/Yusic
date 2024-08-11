import { ElectronAPI } from '@electron-toolkit/preload'
import DirApi from './DirApi'
import TrackTagsApi from './TrackTagsApi'

declare global {
  interface Window {
    electron: ElectronAPI,
    dirApi: DirApi,
    trackTagsApi: TrackTagsApi
  }
}
