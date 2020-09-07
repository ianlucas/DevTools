const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  installExtension(REACT_DEVELOPER_TOOLS)

  const window = new BrowserWindow({
    window: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })

  window.loadFile(path.resolve(__dirname, 'dist/index.html'))
}

app.allowRendererProcessReuse = true
app.whenReady().then(createWindow)
