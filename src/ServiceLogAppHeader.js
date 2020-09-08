import React, { useState } from 'react'
import { Button, ControlGroup, Navbar, NavbarGroup, Icon } from '@blueprintjs/core'
import CodeMirrorEditor from './CodeMirrorEditor'
import './styles/ServiceLogAppHeader.css'

export default function ServiceLogAppHeader () {
  const [value, setValue] = useState('teste')

  function handleChange (newValue) {
    setValue(newValue)
  }

  return (
    <div className='service-log-app-header'>
      <Navbar>
        <NavbarGroup>
          <Navbar.Heading>Service Log App</Navbar.Heading>
          <Navbar.Divider />
          <ControlGroup>
            <div className='bp3-select'>
              <select>
                <option value='dev'>Dev</option>
                <option value='hml'>Hml</option>
                <option value='prd'>Prd</option>
              </select>
            </div>
            <Button icon={<Icon icon='play' intent='success' />}>Run</Button>
          </ControlGroup>

        </NavbarGroup>
      </Navbar>
      <CodeMirrorEditor value={value} onChange={handleChange} />
    </div>
  )
}
