import React, { useState, useEffect } from 'react'
import useEventState from './hooks/useEventState'

import { Button, ControlGroup, Classes, Dialog, Icon, InputGroup, Navbar, NavbarGroup } from '@blueprintjs/core'
import CodeMirrorEditor from './CodeMirrorEditor'

import handleEnter from './handlers/handleEnter'
import locale from './locale'
import source from './custom/ServiceLogApp'

import './styles/ServiceLogAppHeader.css'

const { termServiceLogApp, termRun, termFetching, termChangeTitle, termCancel, termOk } = locale

export default function ServiceLogAppHeader (props) {
  const [showTabTitleDialog, setShowTabTitleDialog] = useState(false)
  const [tabTitle, setTabTitleEvent, setTabTitle] = useEventState('')
  const [queryText, setQueryText] = useState('')
  const [environment, handleEnvironmentChange, setEnvironment] = useEventState('')

  async function handleRunClick () {
    props.onResultChange(environment, queryText)
  }

  function handleTitleChangeDialog () {
    setTabTitle(props.tabTitle)
    setShowTabTitleDialog(true)
  }

  function handleCloseTitleDialog () {
    setShowTabTitleDialog(false)
  }

  function handleApplyTitleDialog () {
    props.onTitleChange(tabTitle)
    handleCloseTitleDialog()
  }

  useEffect(() => {
    if (!props.initialHeaderData) {
      return
    }
    setEnvironment(props.initialHeaderData.environment)
  }, [props.initialHeaderData])

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
                onClick={handleTitleChangeDialog}
              >
                {termChangeTitle}
              </Button>
              <div className='bp3-select'>
                <select
                  onChange={handleEnvironmentChange}
                  value={environment}
                >
                  {source.environments.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                disabled={props.disabled || queryText.length === 0}
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
          initialValue={props.initialHeaderData?.queryText}
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
            onKeyDown={handleEnter(handleApplyTitleDialog)}
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
