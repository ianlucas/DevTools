import React from 'react'
import { Button, Icon } from '@blueprintjs/core'
import './styles/ServiceLogRequestList.css'

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
          <p><Icon icon='cube' /> <em>{record.name}</em></p>
          <p><Icon icon='time' /> <span>{record.requestTime.timeText}</span></p>
        </Button>
      ))}
    </div>
  )
}
