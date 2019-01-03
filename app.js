const { app, BrowserWindow } = require('electron')
require('./backend')
require('electron-reload')(__dirname,{
    electron: require(`${__dirname}/node_modules/electron`)
});

let win 
function createWindow(){
    win = new BrowserWindow({width: 800, height: 600 , backgroundColor : "#fff", titleBarStyle : 'hiddenInset'})
    win.loadURL(`file://${__dirname}/index.html`)
    win.webContents.openDevTools()
    win.setMenu(null)

    win.once('ready-to-show', ()=>{
        win.show()
    })

    win.on('closed', ()=>{
        win = null
    })
}

app.on('ready',createWindow)

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate',()=>{
    if(win === null){
        createWindow()
    }
})