import React, { useState } from 'react'
import useEventState from './hooks/useEventState'

import { Button, ControlGroup, Classes, Dialog, Icon, InputGroup, Navbar, NavbarGroup } from '@blueprintjs/core'
import CodeMirrorEditor from './CodeMirrorEditor'

import locale from './locale'
import source from './custom/ServiceLogApp'

import './styles/ServiceLogAppHeader.css'

const { termServiceLogApp, termRun, termFetching, termChangeTitle, termCancel, termOk } = locale

export default function ServiceLogAppHeader (props) {
  const [showTabTitleDialog, setShowTabTitleDialog] = useState(false)
  const [tabTitle, setTabTitleEvent, setTabTitle] = useEventState('')
  const [queryText, setQueryText] = useState('')
  const [environment, setEnvironment] = useState('')

  async function handleRunClick () {
    props.onUpdateResult(environment, queryText)
  }

  function handleChangeTitleDialog () {
    setTabTitle(props.tabTitle)
    setShowTabTitleDialog(true)
  }

  function handleCloseTitleDialog () {
    setShowTabTitleDialog(false)
  }

  function handleApplyTitleDialog () {
    props.onChangeTitle(tabTitle)
    handleCloseTitleDialog()
  }

  return (
    <>
      <div className='service-log-app-header'>
        <Navbar>
          <NavbarGroup>
            <Navbar.Heading>{termServiceLogApp}</Navbar.Heading>
            <Navbar.Divider />
            <ControlGroup>
              <Button
                icon='label'
                onClick={handleChangeTitleDialog}
              >
                {termChangeTitle}
              </Button>
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
                {props.disabled ? termFetching : termRun}
              </Button>
            </ControlGroup>

          </NavbarGroup>
        </Navbar>
        <CodeMirrorEditor
          disabled={props.disabled}
          onChange={setQueryText}
        />
      </div>
      <Dialog
        title={termChangeTitle}
        icon='help'
        isOpen={showTabTitleDialog}
        onClose={handleCloseTitleDialog}
      >
        <div className={Classes.DIALOG_BODY}>
          <InputGroup
            defaultValue={tabTitle}
            onChange={setTabTitleEvent}
            autoFocus
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              onClick={handleCloseTitleDialog}
            >
              {termCancel}
            </Button>
            <Button
              intent='primary'
              onClick={handleApplyTitleDialog}
            >
              {termOk}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
