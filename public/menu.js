const electron = require('electron');
const Menu = electron.Menu;
const app = electron.app;


var template = [
    {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    },
    {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
    }
]

module.exports = Menu.buildFromTemplate(template);

