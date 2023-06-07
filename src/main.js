const { app, BrowserWindow } = require('electron');

function createWindow()
{
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        show: false, // Don't show until window is ready
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true, // Enable Node.js integration in the renderer process
        },
    });

    mainWindow.once('ready-to-show', () =>
    {
        mainWindow.show()
        mainWindow.maximize()
    })

    // Load your React application
    mainWindow.loadURL('http://localhost:3000'); // Change the URL as needed

    // Open the DevTools (optional)
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() =>
{
    createWindow();

    app.on('activate', function ()
    {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function ()
{
    if (process.platform !== 'darwin') app.quit();
});