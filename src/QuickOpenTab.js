import React, { useState, useEffect } from 'react'

import { InputGroup, Menu, MenuItem, Overlay } from '@blueprintjs/core'

import Files from './lib/Files'
import Fuse from 'fuse.js'
import Mousetrap from 'mousetrap'
import dayjs from 'dayjs'
import orderBy from 'lodash.orderby'
import uniqBy from 'lodash.uniqby'

import './styles/QuickOpenTab.css'

export default function QuickOpenTab (props) {
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState([])
  const [cursor, setCursor] = useState(0)
  const [pattern, setPattern] = useState('')

  function tryClickItem (result) {
    if (!result) {
      return
    }
    props.onClick(result.item)
  }

  function handleChange (e) {
    setPattern(e.target.value)
    if (!pattern.length) {
      return
    }
    const tabList = uniqBy(
      props.tabs.list.concat(
        Files.getCache().map((file) => ({
          id: file.id,
          title: file.title,
          lastUpdateText: dayjs(file.last_update).fromNow(),
          lastUpdate: file.last_update
        }))
      ),
      'id'
    )

    const fuse = new Fuse(tabList, {
      keys: ['title']
    })

    setResults(orderBy(fuse.search(pattern), ['lastUpdate'], 'desc'))
    setCursor(0)
  }

  function handleKeydown (e) {
    if (e.key === 'ArrowDown') {
      setCursor((current) => Math.min(current + 1, results.length - 1))
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      setCursor((current) => Math.max(current - 1, 0))
      e.preventDefault()
    } else if (e.key === 'Enter') {
      tryClickItem(results[cursor])
      handleClose()
    }
  }

  function handleItemClick (index) {
    tryClickItem(results[index])
    handleClose()
  }

  function handleClose () {
    setIsOpen(false)
  }

  useEffect(() => {
    Mousetrap.bind('ctrl+p', () => {
      setIsOpen((current) => !current)
    })
  }, [])

  return (
    <Overlay
      isOpen={isOpen}
      onClose={handleClose}
      transitionDuration={0}
      usePortal
      canEscapeKeyClose
      canOutsideClickClose
    >
      {isOpen && (
        <div className='quick-open-tab-container'>
          <div className='quick-open-tab-box'>
            <InputGroup
              onChange={handleChange}
              onKeyDown={handleKeydown}
              autoFocus
            />
            {results.length > 0 && (
              <Menu>
                {results.map((result, index) => (
                  <MenuItem
                    onClick={handleItemClick.bind(null, index)}
                    key={result.item.id}
                    active={index === cursor}
                    text={(
                      <>
                        <div>{result.item.title}</div>
                        <small className='bp3-text-muted'>{result.item.lastUpdateText}</small>
                      </>
                    )}
                  />
                ))}
              </Menu>
            )}
          </div>
        </div>
      )}
    </Overlay>
  )
}
