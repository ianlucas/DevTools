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
  const [headerData, setHeaderData] = useState(null)
  const [loadedHeaderData, setLoadedHeaderData] = useState(null)
  const [result, setResult] = useState({
    type: 'log',
    canFetchMore: false,
    rows: []
  })

  function fetch (newCurrent) {
    const context = newCurrent || headerData
    return source.fetch(
      context.environment,
      source.beforeFetch(context.queryText, page),
      ServiceAnalysis
    )
  }

  async function handleResultChange (environment, queryText) {
    const currentHeaderData = { environment, queryText }
    setIsDisabled(true)
    setPage(0)
    setHeaderData(currentHeaderData)
    setResult(await fetch(currentHeaderData))
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

  // ** Reading **
  // Initially, we check if this id has a tab and data files
  // generated for them. We load what we could find.
  useEffect(() => {
    async function read () {
      const data = await Filesystem.read(props.tab.id, 'data')
      const tab = await Filesystem.read(props.tab.id, 'tab')
      if (tab) {
        props.onTitleChange(tab.title)
      }
      if (data) {
        setResult(data.result)
        setPage(data.page)
        setLoadedHeaderData(data.headerData)
      }
    }

    read()
  }, [])

  // ** Autosaving **
  // Everytime the tab info changes or result, we queue a autosave
  // this will generate tab and data json files in app path.
  useEffect(() => {
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
            headerData
          }
        }
      )
    }
  }, [props.tab, result, headerData])

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
        onResultChange={handleResultChange}
        onTitleChange={props.onTitleChange}
        tabTitle={props.tab.title}
        disabled={isDisabled}
        initialHeaderData={loadedHeaderData}
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
