import { ElectronAPI } from '@electron-toolkit/preload';
import Api from './Api';
import DatabaseApi from './DatabaseApi';

declare global {
  interface Window {
    electron: ElectronAPI,
    api: Api,
    databaseApi: DatabaseApi
  }
}
