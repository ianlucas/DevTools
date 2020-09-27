const app = window.require('electron').remote
const fs = app.require('fs-extra')
const appData = window.require('app-data-folder')
const path = window.require('path')
const printf = window.require('printf')

module.exports = {
  async persistFile (id, content) {
    const metaFile = path.resolve(appData('DevToolsApp'), printf('%s.meta.json', id))
    const dataFile = path.resolve(appData('DevToolsApp'), printf('%s.data.json', id))
    console.log('saving...', id)
    await fs.writeFile(metaFile, JSON.stringify(content.meta), () => console.log('done meta'))
    await fs.writeFile(dataFile, JSON.stringify(content.data), () => console.log('done data'))
  },

  async readFile (id, type) {
    try {
      return window.require(path.resolve(appData('DevToolsApp'), printf('%s.%s.json', id, type)))
    } catch (e) {
      return null
    }
  }
}
