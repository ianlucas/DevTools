import React from 'react'
import { Button, Icon } from '@blueprintjs/core'
import './styles/ServiceLogRequestList.css'

function getIcon (record) {
  const name = record.icon || 'cube#primary'
  const [icon, intent] = name.split('#')
  return { icon, intent }
}

export default function ServiceLogRequestList (props) {
  const activeRecord = (props.activeRecord || {})

  return (
    <div className='service-log-request-list'>
      {props.records.map((record) => (
        <Button
          key={record.id}
          onClick={props.onClick.bind(null, record)}
          active={activeRecord.id === record.id}
          minimal
        >
          <p><Icon {...getIcon(record)} /> <em>{record.name}</em></p>
          <p><Icon icon='time' /> <span>{record.requestTime.timeText}</span></p>
        </Button>
      ))}
    </div>
  )
}
