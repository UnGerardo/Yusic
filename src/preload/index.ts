import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import Track from '../classes/Track';
import DatabaseApi from './DatabaseApi';
import DirApi from './DirApi';
import MusicMetadataApi from './MusicMetadataApi';

// Custom APIs for renderer
const dirApi: DirApi = {
  readDir: (): Promise<Array<string>> => ipcRenderer.invoke('read-dir'),
  log: (s: string): Promise<void> => ipcRenderer.invoke('log', s)
}

const musicMetadataApi: MusicMetadataApi = {
  getTrackInfo: (filePath: string): Promise<Track> => ipcRenderer.invoke('get-track-info', filePath),
}

const databaseApi: DatabaseApi = {
  writeMusicFiles: (tracks: Track[]): Promise<void> => ipcRenderer.invoke('write-music-files', tracks),
  getAllMusicFiles: (): Promise<Track[]> => ipcRenderer.invoke('get-all-music-files'),
  getTrackIds: (): Promise<number[]> => ipcRenderer.invoke('get-track-ids'),
  getTrackById: (id: number) => ipcRenderer.invoke('get-track-by-id', id),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('dirApi', dirApi);
    contextBridge.exposeInMainWorld('musicMetadataApi', musicMetadataApi);
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
