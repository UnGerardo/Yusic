import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { mkdirSync, readdirSync, Stats, statSync } from 'fs';
import path from 'node:path';
import { IAudioMetadata, parseFile } from 'music-metadata';
import Database from 'better-sqlite3';

import Track from '../classes/Track';

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 815,
    width: 1000,
    minHeight: 550,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.commandLine.appendSwitch('disable-features', 'DnsOverHttps');

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  })

  mkdirSync('data', { recursive: true });
  const db = new Database('data/music.db');
  db.pragma('journal_mode = WAL');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS MusicFiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      artists TEXT,
      album TEXT,
      duration REAL,
      imgFormat TEXT,
      imgData TEXT
    )
  `).run();

  const insertMusicFile = db.prepare(`
    INSERT INTO MusicFiles (path, title, artists, album, duration, imgFormat, imgData)
    VALUES (@path, @title, @artists, @album, @duration, @imgFormat, @imgData)
  `);

  const insertMusicFiles = db.transaction((tracks: Track[]) => {
    for (const track of tracks) {
      insertMusicFile.run({
        path: track.path,
        title: track.title,
        artists: track.artists,
        album: track.album,
        duration: track.duration,
        imgFormat: track.imgFormat,
        imgData: track.imgData
      });
    }
  });

  ipcMain.handle('write-music-files', (_event, tracks: Track[]) => {
    insertMusicFiles(tracks);
  });

  const getAllMusicFiles = () => {
    return db.prepare('SELECT * from MusicFiles').all() as Track[];
  }

  ipcMain.handle('get-all-music-files', (): Track[] => {
    return getAllMusicFiles();
  });

  ipcMain.handle('get-track-ids', (): number[] => {
    return db.prepare('SELECT id FROM MusicFiles').all() as number[];
  });

  ipcMain.handle('get-track-by-id', (_event, id: number): Track => {
    const query = db.prepare('SELECT * FROM MusicFile WHERE id = ?');
    return query.get(id) as Track;
  });

  ipcMain.handle('log', (_event, s: string): void => console.log(s));

  ipcMain.handle('read-dir', () => {
    const dirs = dialog.showOpenDialogSync({ properties: ['openDirectory'] });

    const files: Array<string> = [];

    if (dirs) {
      for (let i = 0; i < dirs.length; i++) {
        const dirItems = readdirSync(path.join(dirs[i]));

        for (let j = 0; j < dirItems.length; j++) {
          const info: Stats = statSync(path.join(dirs[i], dirItems[j]));

          if (info.isDirectory()) {
            dirs.push(path.join(dirs[i], dirItems[j]));
          } else if (dirItems[j].includes('.mp3') || dirItems[j].includes('.ogg')) {
            files.push(path.join(dirs[i], dirItems[j]));
          }
        }
      }
    }
    return files;
  });

  ipcMain.handle('get-track-info', async (_event, filePath): Promise<Track> => {
    const metadata: IAudioMetadata = await parseFile(filePath);
    let pictureData = metadata.common.picture?.at(0)?.data || new Uint8Array();
    const track = new Track(metadata, filePath, Buffer.from(pictureData).toString('base64'));

    return track;
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
