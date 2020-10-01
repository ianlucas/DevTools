const app = window.require('electron').remote
const fs = app.require('fs-extra')
const getAppFolder = app.require('app-data-folder')
const path = app.require('path')
const printf = app.require('printf')

function appPath () {
  return getAppFolder('DevToolsApp')
}

function resolve (id, type) {
  return path.resolve(appPath(), printf('%s.%s.json', id, type))
}

async function write (id, content) {
  try {
    await Promise.all([
      fs.writeFile(resolve(id, 'tab'), JSON.stringify(content.tab)),
      fs.writeFile(resolve(id, 'data'), JSON.stringify(content.data))
    ])
    return true
  } catch (e) {
    return false
  }
}

async function read (id, type) {
  try {
    return JSON.parse(await fs.readFile(resolve(id, type), {
      encoding: 'utf8'
    }))
  } catch (e) {
    return null
  }
}

async function scanType (type) {
  try {
    return (await fs.readdir(appPath())).filter((file) => (
      file.indexOf(`.${type}.`) > -1
    ))
  } catch (e) {
    return []
  }
}

async function scanAndLoad (type) {
  try {
    return (await scanType(type)).map((file) => (
      app.require(path.resolve(appPath(), file))
    ))
  } catch (e) {
    return []
  }
}

module.exports = {
  resolve,
  write,
  read,
  scanType,
  scanAndLoad
}
