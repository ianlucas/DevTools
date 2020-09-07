import React from 'react'
import MonacoEditor from './MonacoEditor'
import './styles/ServiceLogAppHeader.css'

export default function ServiceLogAppHeader () {
  return (
    <div className='service-log-app-header'>
      <MonacoEditor value='Hello' language='sql' />
    </div>
  )
}
