const ipc = require('electron').ipcRenderer
const fs = require('fs')
let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    theme: 'dracula',
    mode: 'javascript',

})
editor.setSize("auto", "500")

const $ =require('jquery')

$('#open').click(function(){
    ipc.send('openfile')
})
$('#save').click(function(){
    
    ipc.send('savefile',editor.getValue())
    
})
ipc.on('saved_success',(e)=>{
    alert("File Saved")
})
ipc.on('filepath',(e,path)=>{
    console.log(path)
    $('#location').text(path)
    $('#fileType').text(path.split('.').pop())
})
ipc.on('fileData',(e,data)=>{
    editor.getDoc().setValue(data)
    
})