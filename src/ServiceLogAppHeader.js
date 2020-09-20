import React, { useState } from 'react'

import { Button, ControlGroup, Navbar, NavbarGroup, Icon } from '@blueprintjs/core'
import CodeMirrorEditor from './CodeMirrorEditor'

import source from './custom/ServiceLogApp'

import './styles/ServiceLogAppHeader.css'

export default function ServiceLogAppHeader (props) {
  const [queryText, setQueryText] = useState('')
  const [environment, setEnvironment] = useState('')

  async function handleRunClick () {
    props.onUpdateResult(environment, queryText)
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
                {source.environments.map((environment) => (
                  <option
                    key={environment.id}
                    value={environment.id}
                  >
                    {environment.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              disabled={props.disabled}
              icon={<Icon icon='play' intent='success' />}
              onClick={handleRunClick}
            >
              {props.disabled ? 'Fetching...' : 'Run'}
            </Button>
          </ControlGroup>

        </NavbarGroup>
      </Navbar>
      <CodeMirrorEditor
        disabled={props.disabled}
        onChange={setQueryText}
      />
    </div>
  )
}
