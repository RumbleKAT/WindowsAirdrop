const { app, BrowserWindow } = require('electron')
const express = require('express')
const http = require('http')
const port = 8080;
const shell = require('node-powershell');
require('electron-reload')(__dirname,{
    electron: require(`${__dirname}/node_modules/electron`)
});

let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

const server = express()

server.get('/upload',(req,res)=>{
    res.end('<h1>Good!</h1')
})

http.createServer(server).listen(port,()=>{
    console.log('localhost:8080 is running...')
})

let win 

function createWindow(){
    win = new BrowserWindow({width: 800, height: 600, show: false , backgroundColor : "#fff"})
    win.loadURL(`file://${__dirname}/index.html`)
    win.webContents.openDevTools()
    
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