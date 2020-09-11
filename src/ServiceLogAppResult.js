import React from 'react'
import { Button } from '@blueprintjs/core'
import ServiceLog from './ServiceLog'
import './styles/ServiceLogAppResult.css'

export default function ServiceLogAppResults (props) {
  return (
    <div className='service-log-app-result'>
      <ServiceLog rows={props.rows} />
      {props.canFetchMore && (
        <footer className='service-log-app-result-footer'>
          <Button
            icon='plus'
            disabled={props.disabled}
            onClick={props.onClickFetchMore}
            loading={props.loading}
          >
            Fetch more...
          </Button>
        </footer>
      )}
    </div>
  )
}
