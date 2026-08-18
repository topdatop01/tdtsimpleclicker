const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const debug = false

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if (!debug) {
        Menu.setApplicationMenu(null);
    }

    win.loadFile('web_files/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

if (debug === false) {
    win.webContents.on('devtools-opened', () => {
        win.webContents.closeDevTools();
    });
}