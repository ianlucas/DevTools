import React from 'react'
import Split from './Split'
import ServiceLogAppHeader from './ServiceLogAppHeader'
import ServiceLogAppResults from './ServiceLogAppResults'

export default function ServiceLogApp (props) {
  return (
    <Split
      className='Split'
      sizes={[25, 75]}
      direction='vertical'
      minSize={100}
      gutterSize={1}
    >
      <ServiceLogAppHeader />
      <ServiceLogAppResults />
    </Split>
  )
}
