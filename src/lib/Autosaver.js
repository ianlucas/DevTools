import { persistFile } from './Filesystem'

const appData = window.require('app-data-folder')
const path = window.require('path')
const fs = window.require('fs')

const filesPath = appData('DevToolsApp')
let cache = []

try {
  fs.readdir(filesPath, (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(filesPath)
    files
      .filter((file) => file.indexOf('.meta.') > -1)
      .map((file) => {
        cache.push(window.require(path.resolve(filesPath, file)))
      })
    console.log(cache)
  })
} catch (e) {
  console.log(e)
}

export default {
  getCache () {
    return cache
  },

  async syncFile (contents) {
    const id = contents.meta.tab.id
    await persistFile(id, contents)
    const cached = cache.find((other) => (
      other.tab.id === id
    ))
    if (cached) {
      cache = cache.map((other) => {
        if (other.tab.id !== id) {
          return other
        }
        return {
          ...other,
          ...contents.meta
        }
      })
    } else {
      cache.push(contents.meta)
    }
  }
}
