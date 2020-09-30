import React, { useState } from 'react'

import QuickOpenTab from './QuickOpenTab'
import Tabs from './Tabs'
import ServiceLogApp from './ServiceLogApp'

import { v4 as uuid } from 'uuid'
import locale from './locale'

import './styles/App.css'

const { termNewTab, termFile, termDebug, termServiceLogApp, termToggleDevTools } = locale
const { remote } = window.require('electron')
const { Menu } = remote

export default function App () {
  // ** Tab handling **

  const [tabs, setTabs] = useState({
    list: [],
    active: null
  })

  function handleTabListChange (list) {
    setTabs((current) => ({
      ...current,
      list
    }))
  }

  function handleTabActiveChange (active) {
    setTabs((current) => ({
      ...current,
      active
    }))
  }

  function handleTabCreate (title, isChangeActive = true, initialId = null) {
    const id = initialId || uuid()
    const tab = {
      id,
      title: title || termNewTab
    }
    setTabs((current) => ({
      active: (
        isChangeActive
          ? tab
          : current.active
      ),
      list: [...current.list, tab]
    }))
  }

  function handleTabTitleChange (title) {
    setTabs((current) => ({
      ...current,
      list: current.list.map((tab) => {
        if (!current.active || tab.id !== current.active.id) {
          return tab
        }
        return {
          ...tab,
          title
        }
      })
    }))
  }

  function handleQuickOpenTabClick (target) {
    const tab = tabs.list.find((other) => (
      other.id === target.id
    ))
    if (tab) {
      setTabs((current) => ({
        ...current,
        active: tab
      }))
    } else {
      handleTabCreate('...', true, target.id)
    }
  }

  // ** Menu handling **

  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: termFile,
        submenu: [
          {
            label: termServiceLogApp,
            click () {
              handleTabCreate()
            }
          }
        ]
      },
      {
        label: termDebug,
        submenu: [
          {
            label: termToggleDevTools,
            click () {
              remote.getCurrentWindow().webContents.openDevTools()
            }
          }
        ]
      }
    ])
  )

  return (
    <div>
      <Tabs
        list={tabs.list}
        active={tabs.active}
        onChange={handleTabListChange}
        onClick={handleTabActiveChange}
        onDoubleClick={handleTabCreate}
      />
      <div className='App-program'>
        {tabs.list.map((tab) => (
          <ServiceLogApp
            style={{
              display: (tab.id === tabs.active.id ? 'block' : 'none')
            }}
            key={tab.id}
            onTitleChange={handleTabTitleChange}
            tab={tab}
          />
        ))}
      </div>
      <QuickOpenTab
        tabs={tabs}
        onClick={handleQuickOpenTabClick}
      />
    </div>
  )
}
