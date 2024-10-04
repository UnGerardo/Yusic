import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { mkdirSync, readdirSync, Stats, statSync } from 'fs';
import path from 'node:path';
import { IAudioMetadata, parseFile } from 'music-metadata';
import Database from 'better-sqlite3';

import Track from '../classes/Track';
import Setting from '../classes/Setting';
import Playlist from '../classes/Playlist';

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

  db.prepare(`
    CREATE TABLE IF NOT EXISTS Playlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `).run();

  ipcMain.handle('get-playlists', (): Playlist[] => {
    return db.prepare('SELECT * FROM Playlists').all() as Playlist[];
  });

  ipcMain.handle('create-playlist', (_event, name: string): void => {
    db.prepare('INSERT INTO Playlists (name) VALUES (?)').run(name);
  });

  db.prepare(`
    CREATE TABLE IF NOT EXISTS PlaylistTracks (
      playlistId INTEGER,
      musicFileId INTEGER,
      addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (playlistId, musicFileId),
      FOREIGN KEY (playlistId) REFERENCES Playlists(id) ON DELETE CASCADE,
      FOREIGN KEY (musicFileId) REFERENCES MusicFiles(id) ON DELETE CASCADE
    )
  `).run();

  ipcMain.handle('get-playlist-tracks', (_event, playlistId: number): Track[] => {
    return db.prepare(`
      SELECT mf.id, mf.path, mf.title, mf.artists, mf.album, mf.duration, mf.imgFormat, mf.imgData
      FROM MusicFiles mf
      INNER JOIN PlaylistTracks pt ON mf.id = pt.musicFileId
      WHERE pt.playlistId = ?
      ORDER BY pt.addedAt
    `).all(playlistId) as Track[];
  });

  ipcMain.handle('add-track-to-playlist', (_event, playlistId: number, musicFileId: number): void => {
    db.prepare('INSERT INTO PlaylistTracks (playlistId, musicFileId) VALUES (?, ?)').run(playlistId, musicFileId);
  });

  db.prepare(`
    CREATE TABLE IF NOT EXISTS AppSettings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      value TEXT NOT NULL
    )
  `).run();

  const appSettings = db.prepare('SELECT * FROM AppSettings').all();
  if (appSettings.length === 0) {
    const settings = {
      'bg-color': 'gray',
      'bg-image': '',
      'bg-image-opacity': '1',
    }
    const insertQuery = db.prepare('INSERT INTO AppSettings (name, value) VALUES (?, ?)');

    for (const setting in settings) {
      insertQuery.run(setting, settings[setting]);
    }
  }

  ipcMain.handle('get-app-settings', () => {
    return db.prepare('SELECT * FROM AppSettings').all() as Setting[];
  });

  ipcMain.handle('set-app-setting', (_event, name: string, value: string) => {
    db.prepare('UPDATE AppSettings SET value = ? WHERE name = ?').run(value, name);
  });

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

  ipcMain.handle('select-dir', (): string => {
    const selection = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    return selection ? selection[0] : '';
  })

  ipcMain.handle('add-tracks', async (_event, initialPath: string): Promise<Track[]> => {
    const audioFiles: string[] = [];
    const dirStack: string[] = [initialPath];

    while (dirStack.length > 0) {
      const dirPath: string = dirStack.pop()!;
      const items: string[] = readdirSync(dirPath);

      for (const item of items) {
        const fullPath: string = path.join(dirPath, item);
        const itemStats: Stats = statSync(fullPath);

        if (itemStats.isDirectory()) {
          dirStack.push(fullPath);
          continue;
        }

        const splitItemPath = item.split('.');
        const fileExtension = splitItemPath[splitItemPath.length - 1];

        switch (fileExtension) {
          case 'mp3':
          case 'ogg':
            audioFiles.push(fullPath);
        }
      }
    }

    const tracks: Track[] = [];

    for (const file of audioFiles) {
      const metadata: IAudioMetadata = await parseFile(file);
      let pictureData = metadata.common.picture?.at(0)?.data || new Uint8Array();
      const track = new Track(metadata, file, Buffer.from(pictureData).toString('base64'));
      tracks.push(track);
    }

    insertMusicFiles(tracks);

    return getAllMusicFiles();
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
