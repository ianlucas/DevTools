import React, { useState, useEffect } from 'react'

import Split from './Split'
import ServiceLogAppHeader from './ServiceLogAppHeader'
import ServiceLogAppResult from './ServiceLogAppResult'

import Files from './lib/Files'
import Filesystem from './lib/Filesystem'
import ServiceAnalysis from './lib/ServiceAnalysis'
import source from './custom/ServiceLogApp'

import './styles/ServiceLogApp.css'

export default function ServiceLogApp (props) {
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [current, setCurrent] = useState(null)
  const [result, setResult] = useState({
    type: 'log',
    canFetchMore: false,
    rows: []
  })

  function fetch (newCurrent) {
    const context = newCurrent || current
    return source.fetch(
      context.environment,
      source.beforeFetch(context.queryText, page),
      ServiceAnalysis
    )
  }

  async function handleUpdateResult (environment, queryText) {
    const newCurrent = { environment, queryText }
    setIsDisabled(true)
    setPage(0)
    setCurrent(newCurrent)
    setResult(await fetch(newCurrent))
    setIsDisabled(false)
  }

  async function handleClickFetchMore () {
    setIsDisabled(true)
    setIsLoading(true)
    setPage(page + 1)
    const newResult = await fetch()
    setResult({
      ...newResult,
      rows: result.rows.concat(newResult.rows)
    })
    setIsDisabled(false)
    setIsLoading(false)
  }

  useEffect(() => {
    async function read () {
      const data = await Filesystem.read(props.tab.id, 'data')
      const tab = await Filesystem.read(props.tab.id, 'tab')
      if (tab) {
        props.onChangeTitle(tab.title)
      }
      if (data) {
        setResult(data.result)
        setPage(data.page)
        setPage(data.current)
      }
      console.log('>>ending reading')
    }

    read()
  }, [])

  useEffect(() => {
    // only applications with rows will autosave.
    if (result.rows.length) {
      Files.queue(
        props.tab.id,
        {
          tab: {
            ...props.tab,
            last_update: +new Date()
          },
          data: {
            result,
            page,
            current
          }
        }
      )
    }
  }, [props.tab, result])

  return (
    <Split
      className='service-log-app split'
      style={props.style}
      sizes={[20, 80]}
      direction='vertical'
      minSize={100}
      gutterSize={1}
    >
      <ServiceLogAppHeader
        onUpdateResult={handleUpdateResult}
        onChangeTitle={props.onChangeTitle}
        tabTitle={props.tab.title}
        disabled={isDisabled}
      />
      <ServiceLogAppResult
        {...result}
        loading={isLoading}
        disabled={isDisabled}
        onClickFetchMore={handleClickFetchMore}
      />
    </Split>
  )
}
