import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import Track from '../classes/Track';
import Setting from '../classes/Setting';
import DatabaseApi from './DatabaseApi';
import Api from './Api';

// Custom APIs for renderer
const api: Api = {
  selectDir: (): Promise<string> => ipcRenderer.invoke('select-dir'),
  log: (s: string): Promise<void> => ipcRenderer.invoke('log', s),
}

const databaseApi: DatabaseApi = {
  addTracks: (initialPath: string): Promise<Track[]> => ipcRenderer.invoke('add-tracks', initialPath),
  getAllMusicFiles: (): Promise<any[]> => ipcRenderer.invoke('get-all-music-files'),
  getTrackIds: (): Promise<number[]> => ipcRenderer.invoke('get-track-ids'),
  getTrackById: (id: number) => ipcRenderer.invoke('get-track-by-id', id),
  getAppSettings: (): Promise<Setting[]> => ipcRenderer.invoke('get-app-settings'),
  getAppSetting: (name: string): Promise<Setting> => ipcRenderer.invoke('get-app-setting', name),
  setAppSetting: (name: string, value: string): Promise<void> => ipcRenderer.invoke('set-app-setting', name, value),
  createPlaylist: (name: string): Promise<void> => ipcRenderer.invoke('create-playlist', name),
  getPlaylists: (): Promise<object> => ipcRenderer.invoke('get-playlists'),
  getPlaylist: (name: string): Promise<object> => ipcRenderer.invoke('get-playlist', name),
  addTrackToPlaylist: (playlistId: number, trackId: number): Promise<void> => ipcRenderer.invoke('add-track-to-playlist', playlistId, trackId),
  removeTrackFromPlaylist: (playlistId: number, trackId: number): Promise<void> => ipcRenderer.invoke('remove-track-to-playlist', playlistId, trackId),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
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
