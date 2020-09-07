import React from 'react'
import ServiceLog from './ServiceLog'
import sampleRows from './sampleRows'
import './styles/ServiceLogAppResults.css'

export default function ServiceLogAppResults () {
  return (
    <div class='service-log-app-results'>
      <ServiceLog rows={sampleRows} />
    </div>
  )
}
