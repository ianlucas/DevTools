import React, { useState } from 'react'
import Split from './Split'
import ServiceLogAppHeader from './ServiceLogAppHeader'
import ServiceLogAppResult from './ServiceLogAppResult'
import './styles/ServiceLogApp.css'

export default function ServiceLogApp (props) {
  const [result, setResult] = useState({
    type: 'log',
    rows: []
  })

  return (
    <Split
      className='service-log-app split'
      sizes={[20, 80]}
      direction='vertical'
      minSize={256}
      gutterSize={1}
    >
      <ServiceLogAppHeader
        onUpdateResult={setResult}
      />
      <ServiceLogAppResult
        {...result}
      />
    </Split>
  )
}
