const { app, BrowserWindow,ipcMain } = require('electron')
const shell =require('shelljs')

function createWindow () {

  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  ipcMain.on('openfile',(e)=>{
      
      const dialog =  require('electron').dialog
      dialog.showOpenDialog(filename=>{
        if(filename!= undefined){
          readFile(filename[0])
        }
        else{
          console.log("File Not Found")
        }
      })
      const readFile = filepath=>{
        const fs = require('fs')
        fs.readFile(filepath,'utf-8',(err,data)=>{
          if(!err){
          
          e.sender.send('fileath',filepath)
          e.sender.send('fileData',data)
        }
        else{
          console.log(err)
        }
      })
      }
    
  })

  ipcMain.on('savefile',function(e,data){
    
    const fs=require('fs')
    const d = require('electron').dialog
    d.showSaveDialog(filename=>{
        if(filename!=undefined){
          fs.writeFile(filename,data,callback=>{
            console.log('error')
          })
          e.sender.send('saved_success')
        }
    })
  })

  
 
  
  win.loadFile('index.html')


} 

app.on('ready', createWindow)

