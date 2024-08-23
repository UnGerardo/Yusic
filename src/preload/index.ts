import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import DirApi from './DirApi'
import TrackTagsApi from './TrackTagsApi'
import { IAudioMetadata } from 'music-metadata'
import DatabaseApi from './DatabaseApi'
import Track from '../classes/Track'

// Custom APIs for renderer
const dirApi: DirApi = {
  readDir: (): Promise<Array<string>> => ipcRenderer.invoke('read-dir')
}

const trackTagsApi: TrackTagsApi = {
  getTrackTags: (file: string): Promise<IAudioMetadata> => ipcRenderer.invoke('get-track-tags', file),
  uint8ToBase64: (data: Uint8Array): Promise<string> => ipcRenderer.invoke('uint8-to-b64', data)
}

const databaseApi: DatabaseApi = {
  writeMusicFiles: (tracks: Track[]): Promise<void> => ipcRenderer.invoke('write-music-files', tracks),
  getAllMusicFiles: (): Promise<Track[]> => ipcRenderer.invoke('get-all-music-files')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('dirApi', dirApi);
    contextBridge.exposeInMainWorld('trackTagsApi', trackTagsApi);
    contextBridge.exposeInMainWorld('databaseApi', databaseApi);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
