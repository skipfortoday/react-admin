const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const serve = require('electron-serve');
const path = require('path');
const loadURL = serve({directory: 'build'});
const menu = require('./menu');
let mainWindow;

(async () => {
	await app.whenReady();

	const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

	mainWindow = new BrowserWindow({
		width: width,
      	height: height,
      	nodeIntegration: true,
      	minimizable: true,
        fullscreenable:true, 
      	maximizable: true,
        autoHideMenuBar: true,
        backgroundColor:'#f7a440',
      	icon: path.join(__dirname, 'build/favicon.ico'),
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, './node-server/index.js')
		  }
	});

	//await mainWindow.setMenu(menu);
	await loadURL(mainWindow);
	
	// await require(path.join(__dirname, 'build/server.js'));
	// The above is equivalent to this:
	await mainWindow.loadURL('build');
	// The `-` is just the required hostname

	//mainWindow.webContents.openDevTools();
})();