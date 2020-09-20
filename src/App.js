import React, { useState } from 'react'

import Tabs from './Tabs'
import ServiceLogApp from './ServiceLogApp'

import './styles/App.css'

export default function App () {
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState({})

  function handleTabs (tabs) {
    tabs.createTab('Service Log App', true)
  }

  function handleTabsChange (newTabs) {
    setTabs(newTabs)
  }

  function handleTabActiveChange (newActiveTab) {
    setActiveTab(newActiveTab)
  }

  return (
    <div>
      <Tabs
        onInit={handleTabs}
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
          />
        ))}
      </div>
    </div>
  )
}
