import React, { useState } from 'react'
import { Button, ControlGroup, Navbar, NavbarGroup, Icon } from '@blueprintjs/core'
import useEventState from './hooks/useEventState'
import CodeMirrorEditor from './CodeMirrorEditor'
import ServiceLogAppAPI from './custom/ServiceLogAppAPI'
import './styles/ServiceLogAppHeader.css'

export default function ServiceLogAppHeader (props) {
  const [queryText, setQueryText] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const [environment, setEnvironment] = useState('')

  async function handleRunClick () {
    setIsDisabled(true)
    props.onUpdateResult(
      await ServiceLogAppAPI.fetch(
        environment,
        await ServiceLogAppAPI.beforeFetch(queryText)
      )
    )
    setIsDisabled(false)
  }

  return (
    <div className='service-log-app-header'>
      <Navbar>
        <NavbarGroup>
          <Navbar.Heading>Service Log App</Navbar.Heading>
          <Navbar.Divider />
          <ControlGroup>
            <div className='bp3-select'>
              <select onChange={setEnvironment}>
                <option value='dev'>Dev</option>
                <option value='hml'>Hml</option>
                <option value='prd'>Prd</option>
              </select>
            </div>
            <Button
              disabled={isDisabled}
              icon={<Icon icon='play' intent='success' />}
              onClick={handleRunClick}
            >
              Run
            </Button>
          </ControlGroup>

        </NavbarGroup>
      </Navbar>
      <CodeMirrorEditor
        disabled={isDisabled}
        onChange={setQueryText}
      />
    </div>
  )
}
