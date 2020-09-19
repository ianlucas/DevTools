import React from 'react'

import ServiceLogGroup from './ServiceLogGroup'

import { createGroupsFromRows } from './utils'

import './styles/ServiceLog.css'

export default function ServiceLog (props) {
  const groups = createGroupsFromRows(props.rows)

  return (
    <div className='service-log'>
      {groups.map((group, index) => (
        <ServiceLogGroup key={index} group={group} />
      ))}
    </div>
  )
}
