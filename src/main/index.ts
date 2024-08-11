import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { readdirSync, Stats, statSync } from 'fs'
import path from 'node:path'
import { parseFile } from 'music-metadata'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
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

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  })

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

  ipcMain.handle('get-track-tags', async (_event, file) => {
    const metadata = await parseFile(file);
    console.log(metadata);
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
