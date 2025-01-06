const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const main = require('./server');
const { ipcMain, app, BrowserWindow } = require('electron');
/**
 * @param Realtime Communication.
 */
const server = http.createServer(main);
const io = socketio(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(
        `New Client Connected`
    );

    socket.on('disconnect', () => {
        console.log(
            `Client Disconnected`
        )
    });
});

/**
 * @parma Standalone Appication.
 */
const createWindow = () => {
    try {
        const window = new BrowserWindow({
            title: 'Dilo',
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true,
                contextIsolation: true,
            }
        });

        window.loadURL('http://localhost:1991');
    } catch(err) {
        console.error(err);
    }
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
});

/**
 * @param Main application process handling.
 */