import React from 'react'
import ServiceLog from './ServiceLog'
import './styles/ServiceLogAppResult.css'

export default function ServiceLogAppResults (props) {
  return (
    <div className='service-log-app-result'>
      <ServiceLog rows={props.rows} />
    </div>
  )
}
