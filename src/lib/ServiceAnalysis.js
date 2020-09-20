import Sizzle from './Sizzle'

const fs = window.require('fs')
const path = window.require('path')

const filesPath = path.resolve(__dirname, '../custom/ServiceAnalysis')
const loadedServices = []

try {
  fs.readdir(filesPath, (err, files) => {
    if (err) {
      return
    }
    files.map((file) => {
      loadedServices.push(window.require(path.resolve(filesPath, file)))
    })
  })
} catch (e) {
  console.log(e)
}

function handleAnalysis () {
  const data = {}

  return {
    push (key, value) {
      const lastValue = data[key]
      if (Array.isArray(lastValue)) {
        lastValue.push(value)
      } else {
        data[key] = []
        if (lastValue !== undefined) {
          data[key].push(lastValue)
        }
        data[key].push(value)
      }
    },

    set (key, value) {
      data[key] = value
    },

    get () {
      return data
    }
  }
}

function handleJson (text) {
  let json = text

  try {
    json = JSON.parse(text)
  } catch (e) {
    json = {}
  }

  return function get (path) {
    let current = json
    try {
      path
        .split('.')
        .forEach((prop) => {
          current = current[prop]
        })
    } catch (e) {
      return null
    }
    return current
  }
}

function handleXml (text) {
  const parser = new window.DOMParser()
  const doc = parser.parseFromString(text, 'text/xml')

  function mutate (node) {
    Object.assign(node, {
      is () {
        return node.textContent.trim()
      }
    })
    return node
  }

  return {
    one (selector) {
      return Sizzle(selector, doc).map(mutate)[0] || ({
        is: () => ''
      })
    },

    all (selector) {
      return Sizzle(selector, doc).map(mutate)
    }
  }
}

function handleAll (services, type) {
  const all = services.find((other) => (
    other.name === '$all' &&
      other.type === type
  )) || {}

  if (!all.request) {
    all.request = () => 0
  }

  if (!all.response) {
    all.response = () => 0
  }

  return all
}

export default {
  analyse (name, request, response) {
    const service = loadedServices.find((other) => (
      other.name === name
    ))

    if (!service || !service.type) {
      return null
    }

    let handle
    const analysis = handleAnalysis()
    const all = handleAll(loadedServices, service.type)

    if (service.type === 'application/json') {
      handle = handleJson
    } else {
      handle = handleXml
    }

    if (service.request) {
      all.request(handle(request), analysis)
      service.request(handle(request), analysis)
    }

    if (service.response) {
      all.response(handle(response), analysis)
      service.response(handle(response), analysis)
    }

    return analysis.get()
  }
}
