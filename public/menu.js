const electron = require('electron');
const Menu = electron.Menu;
const app = electron.app;


var template = [
    {
        label: 'Refresh',
        accelerator: 'CmdOrCtrl+R',
        role: 'reload',
    }
]

module.exports = Menu.buildFromTemplate(template);

