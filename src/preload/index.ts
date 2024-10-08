import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import Track from '../classes/Track';
import Setting from '../classes/Setting';
import DatabaseApi from './DatabaseApi';
import DirApi from './DirApi';
import MusicMetadataApi from './MusicMetadataApi';
import Playlist from '../classes/Playlist';

// Custom APIs for renderer
const dirApi: DirApi = {
  readDir: (): Promise<string[]> => ipcRenderer.invoke('read-dir'),
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
  getAppSettings: (): Promise<Setting[]> => ipcRenderer.invoke('get-app-settings'),
  setAppSetting: (name: string, value: string): Promise<void> => ipcRenderer.invoke('set-app-setting', name, value),
  getPlaylists: (): Promise<Playlist[]> => ipcRenderer.invoke('get-playlists'),
  createPlaylist: (name: string): Promise<void> => ipcRenderer.invoke('create-playlist', name),
  getPlaylistTracks: (playlistId: number): Promise<Track[]> => ipcRenderer.invoke('get-playlist-tracks', playlistId),
  addTrackToPlaylist: (playlistId: number, trackId: number): Promise<void> => ipcRenderer.invoke('add-track-to-playlist', playlistId, trackId),
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
