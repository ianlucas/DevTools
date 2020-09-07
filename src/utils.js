import beautify from 'js-beautify'
import sortBy from 'lodash.sortby'

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
