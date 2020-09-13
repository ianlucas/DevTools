import beautify from 'js-beautify'
import sortBy from 'lodash.sortby'
import FileSaver from 'file-saver'

export function createGroupsFromRows (rows) {
  const result = []
  const cache = {}

  sortBy(rows, (record) => record.requestTime.epoch)
    .reverse()
    .forEach((record) => {
      const { group } = record
      if (!cache[group]) {
        cache[group] = {
          group,
          infobox: [],
          records: []
        }

        result.push(cache[group])
      }

      cache[group].infobox = record.infobox
      cache[group].records.push(record)
    })

  return result
}

export function beautifier (type, text) {
  const options = {
    indent_size: 2
  }
  if (type === 'json') {
    return beautify(text, options)
  } else if (type === 'xml') {
    return beautify.html_beautify(text, options)
  }
}

/**
 * @param {HTMLElement|String} htmlElement
 */
export function copyHtmlElement (htmlElement) {
  let element = htmlElement
  let dummy = null

  if (typeof htmlElement === 'string') {
    dummy = document.createElement('div')
    dummy.innerHTML = htmlElement
    document.body.appendChild(dummy)
    element = dummy
  }

  if (document.body.createTextRange) {
    const range = document.body.createTextRange()
    range.moveToElementText(element)
    range.select()
    document.execCommand('Copy')
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('Copy')
  }

  if (dummy) {
    document.body.removeChild(dummy)
  }
}

/**
 * @param {String} text
 */
export function copyText (text) {
  const textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  textarea.value = text
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function writeFile (name, content, type = 'application/json;charset=utf-8') {
  const blob = new window.Blob([content], { type })
  FileSaver.saveAs(blob, name)
}
