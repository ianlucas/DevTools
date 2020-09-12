import React, { useRef } from 'react'
import { Button } from '@blueprintjs/core'
import { Table, Column, Cell } from '@blueprintjs/table'
import ServiceLog from './ServiceLog'
import './styles/ServiceLogAppResult.css'

export default function ServiceLogAppResults (props) {
  const table = useRef(null)
  const rowsCount = props.rows.length
  const columns = Object.keys(props.rows[0] || {})
  const className = [
    'service-log-app-result',
    props.type === 'table' ? 'no-scroll' : ''
  ]

  return (
    <div className={className.join(' ')}>
      {props.type === 'log' && <ServiceLog rows={props.rows} />}
      {props.type === 'table' && (
        <Table
          ref={table}
          numRows={rowsCount}
          getCellClipboardData={(rowIndex, columnIndex) => (
            props.rows[rowIndex][columns[columnIndex]]
          )}
          onCompleteRender={() => {
            if (
              !table.current ||
              !props.canFetchMore ||
              props.disabled ||
              props.loading
            ) {
              return
            }
            const scroller = table.current.scrollContainerElement
            if (scroller.scrollTop === (scroller.scrollHeight - scroller.clientHeight)) {
              props.onClickFetchMore()
            }
          }}
        >
          {columns.map((column, index) => (
            <Column
              key={index}
              name={column}
              cellRenderer={(rowIndex) => (
                <Cell>{props.rows[rowIndex][column]}</Cell>
              )}
            />
          ))}
        </Table>
      )}
      {(props.canFetchMore && props.type === 'log') && (
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
