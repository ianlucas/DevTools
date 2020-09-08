import React from 'react'
import Tabs from './Tabs'
import ServiceLogApp from './ServiceLogApp'
import './styles/App.css'

export default function App () {
  function handleTabs (tabs) {
    tabs.createTab('Service Log App', true)
  }

  return (
    <div>
      <Tabs onInit={handleTabs} />
      <div className='App-program'>
        <ServiceLogApp />
      </div>
    </div>
  )
}
