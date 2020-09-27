import React, { useState, useEffect } from 'react'

import Split from './Split'
import ServiceLogAppHeader from './ServiceLogAppHeader'
import ServiceLogAppResult from './ServiceLogAppResult'

import Autosaver from './lib/Autosaver'
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
      try {
        console.log('>>starting reading')
        console.log(props.tab.id)
        const data = await Filesystem.readFile(props.tab.id, 'data')
        const meta = await Filesystem.readFile(props.tab.id, 'meta')
        console.log(data)
        console.log(meta)
        props.onChangeTitle(meta.tab.title)
        setResult(data.result)
      } catch (e) {
        console.log(e)
        console.log('not found id: ', props.tab)
      }
      console.log('>>ending reading')
    }

    read()
  }, [])

  useEffect(() => {
    async function autosave () {
      if (result.rows.length) {
        await Autosaver.syncFile({
          meta: {
            tab: props.tab,
            last_update: +new Date()
          },
          data: {
            result
          }
        })
      }
    }

    autosave()
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
