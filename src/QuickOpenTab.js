import React, { useState, useEffect } from 'react'

import { InputGroup, Menu, MenuItem, Overlay } from '@blueprintjs/core'

import Autosaver from './lib/Autosaver'
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
  const [tabResults, setTabResults] = useState([])
  const [displayedResults, setDisplayedResults] = useState([])

  function refreshTabResults (list, active) {
    const join = (
      active
        ? [active]
        : []
    )
    setTabResults(join.concat(list.filter((other) => {
      return other.id !== active.id
    })).map((item) => ({
      item
    })))
  }

  function refreshResults (pattern) {
    if (!pattern.length) {
      return
    }
    const tabList = uniqBy(
      tabResults.map((result) => result.item).concat(
        Autosaver.getCache().map((file) => ({
          id: file.tab.id,
          title: file.tab.title,
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

  function handleChange (e) {
    setPattern(e.target.value)
    refreshResults(e.target.value)
  }

  function handleKeydown (e) {
    if (e.key === 'ArrowDown') {
      setCursor((current) => Math.min(current + 1, displayedResults.length - 1))
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      setCursor((current) => Math.max(current - 1, 0))
      e.preventDefault()
    } else if (e.key === 'Enter') {
      props.onClick(displayedResults[cursor].item)
      handleClose()
    }
  }

  function handleItemClick (index) {
    props.onClick(displayedResults[index].item)
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

  useEffect(() => {
    refreshTabResults(props.tabs.list, props.tabs.active)
  }, [props.tabs])

  useEffect(() => {
    setDisplayedResults(
      pattern.length
        ? results
        : tabResults
    )
  }, [pattern])

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
            {displayedResults.length > 0 && (
              <Menu>
                {displayedResults.map((result, index) => (
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
