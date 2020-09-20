import React, { useState } from 'react'

import QuickOpenTab from './QuickOpenTab'
import Tabs from './Tabs'
import ServiceLogApp from './ServiceLogApp'

import locale from './locale'

import './styles/App.css'

const { termNewTab } = locale

export default function App () {
  const [tab, setTab] = useState(null)
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState({})

  function handleTabInit (newTab) {
    newTab.createTab(termNewTab, true)
    setTab(newTab)
  }

  function handleTabsChange (newTabs) {
    setTabs(newTabs)
  }

  function handleTabActiveChange (newActiveTab) {
    setActiveTab(newActiveTab)
  }

  function handleChangeTabTitle (title) {
    tab.setTabs(tabs.map((tab) => {
      if (tab.id !== activeTab.id) {
        return tab
      }
      return {
        ...tab,
        title
      }
    }))
  }

  return (
    <div>
      <Tabs
        onInit={handleTabInit}
        onChange={handleTabsChange}
        onActiveChange={handleTabActiveChange}
      />
      <div className='App-program'>
        {tabs.map((tab) => (
          <ServiceLogApp
            style={{
              display: (tab.id === activeTab.id ? 'block' : 'none')
            }}
            key={tab.id}
            onChangeTitle={handleChangeTabTitle}
            tabTitle={tab.title}
          />
        ))}
      </div>
      <QuickOpenTab />
    </div>
  )
}
