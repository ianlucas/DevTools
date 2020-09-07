import React, { useState } from 'react'
import ServiceLogRequestList from './ServiceLogRequestList'
import ServiceLogInfo from './ServiceLogInfo'
import ServiceLogRequest from './ServiceLogRequest'
import './styles/ServiceLogGroup.css'

export default function ServiceLogGroup (props) {
  const [record, setRecord] = useState(null)

  const handleClick = (clickedRecord) => {
    if (record && record.id === clickedRecord.id) {
      return setRecord(null)
    }
    setRecord({ ...clickedRecord })
  }

  return (
    <article className='service-log-group'>
      <header className='service-log-group-header'>
        <ServiceLogInfo infobox={props.group.infobox} />
        <ServiceLogRequestList
          activeRecord={record}
          records={props.group.records}
          onClick={handleClick}
        />
      </header>
      {record && <ServiceLogRequest {...record} />}
    </article>
  )
}
