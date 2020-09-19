import React, { useState, useRef, useEffect } from 'react'

import { v4 as uuid } from 'uuid'
import classNames from 'classnames'

import './styles/Tabs.css'

const WHEEL_SENSITIVITY = 0.5

export default function Tabs (props) {
  const refTabs = useRef(null)
  const [tabs, setTabs] = useState([])
  const [hoverTab, setHoverTab] = useState(null)
  const [draggedTab, setDraggedTab] = useState(null)
  const [activeTab, setActiveTab] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  function createTab (title, shouldBeActive = false) {
    const id = uuid()
    const tab = {
      id,
      title: title || 'New Tab'
    }
    setTabs([...tabs, tab])
    if (shouldBeActive) {
      setActiveTab(tab)
    }
    return id
  }

  function handleDoubleClick (e) {
    if (e.target.className !== 'Tabs') {
      return
    }
    createTab(null, true)
  }

  function handleMousedown (e, tab) {
    if (e.button === 0) {
      return setActiveTab(tab)
    } else if (e.button === 1) {
      return removeTab(tab)
    }
  }

  function handleDrag (tab) {
    setDraggedTab(tab)
    setIsDragging(true)
  }

  function handleDragOver (e, tab) {
    setHoverTab(tab)
    e.dataTransfer.dropEffect = 'move'
    e.preventDefault()
  }

  function handleDragEnd () {
    setHoverTab(null)
    setIsDragging(false)
  }

  function handleRootDragOver (e) {
    if (e.target.className !== 'Tabs') {
      return
    }
    handleDragOver(e, null)
  }

  function handleDrop () {
    const fromIndex = tabs.findIndex((other) => (
      other.id === draggedTab?.id
    ))
    const toIndex = tabs.findIndex((other) => (
      other.id === hoverTab?.id
    ))
    const current = tabs.filter((tab) => (
      tab.id !== draggedTab.id
    ))
    if (hoverTab === null) {
      current.push(draggedTab)
    } else if (toIndex === 0) {
      current.unshift(draggedTab)
    } else {
      current.splice(
        toIndex +
        (fromIndex > toIndex ? 1 : 0),
        0,
        draggedTab
      )
    }
    setTabs(current)
  }

  function removeTab (tab, shouldSetActive = true) {
    const index = tabs.findIndex((other) => (
      other.id === tab.id
    ))
    const current = tabs.filter((other) => (
      other.id !== tab.id
    ))
    if (shouldSetActive) {
      setActiveTab(current[index] || current[0])
    }
    setTabs(current)
  }

  function handleWheel (e) {
    refTabs.current.scrollLeft += e.deltaY * WHEEL_SENSITIVITY
  }

  useEffect(() => {
    props.onInit({
      createTab
    })
  }, [])

  return (
    <nav
      className='Tabs'
      ref={refTabs}
      onDoubleClick={handleDoubleClick}
      onDragOver={handleRootDragOver}
      onDrop={handleDrop}
      onWheel={handleWheel}
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={classNames({
            'Tabs-tab': true,
            isActive: activeTab && activeTab.id === tab.id
          })}
          draggable
          onMouseDown={(e) => handleMousedown(e, tab)}
          onDrag={(e) => handleDrag(tab)}
          onDragEnd={(e) => handleDragEnd(tab)}
          onDragOver={(e) => handleDragOver(e, tab)}
        >
          {tab.title}
          <svg
            className={classNames({
              'Tabs-close': true,
              isIgnore: isDragging
            })}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512.001 512.001'
            onClick={() => removeTab(tab)}
          >
            <path
              fill='#333'
              d='M284.286 256.002L506.143 34.144c7.811-7.811 7.811-20.475 0-28.285-7.811-7.81-20.475-7.811-28.285 0L256 227.717 34.143 5.859c-7.811-7.811-20.475-7.811-28.285 0-7.81 7.811-7.811 20.475 0 28.285l221.857 221.857L5.858 477.859c-7.811 7.811-7.811 20.475 0 28.285a19.938 19.938 0 0014.143 5.857 19.94 19.94 0 0014.143-5.857L256 284.287l221.857 221.857c3.905 3.905 9.024 5.857 14.143 5.857s10.237-1.952 14.143-5.857c7.811-7.811 7.811-20.475 0-28.285L284.286 256.002z'
            />
          </svg>
        </div>
      ))}
    </nav>
  )
}
