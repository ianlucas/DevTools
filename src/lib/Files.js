import { write, scanAndLoad } from './Filesystem'

let cache = []
const persistQueue = {}

async function initializeCache () {
  scanAndLoad('tab').then((list) => {
    list.forEach((tab) => (
      cache.push(tab)
    ))
  })
}

function getCache () {
  return cache
}

async function persist (id, contents, inQueue) {
  await write(id, contents)
  const cached = cache.find((other) => (
    other.id === id
  ))
  if (cached) {
    cache = cache.map((other) => {
      try {
        if (other.id !== id) {
          return other
        }
        return {
          ...other,
          ...contents.tab
        }
      } catch (e) {
        return other
      }
    })
  } else {
    cache.push(contents.tab)
  }
  // handle queue code here, should it really be here tho?
  if (inQueue) {
    persistQueue[id].shift()
    if (persistQueue[id].length > 0) {
      persist(id, persistQueue[0], true)
    }
  }
}

function queue (id, contents) {
  if (!persistQueue[id]) {
    persistQueue[id] = []
  }
  persistQueue[id].push(contents)
  if (persistQueue[id].length === 1) {
    persist(id, contents, true)
  }
}

initializeCache()

export default {
  getCache,
  persist,
  queue
}
