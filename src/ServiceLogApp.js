import React, { useState } from 'react'
import Split from './Split'
import ServiceLogAppHeader from './ServiceLogAppHeader'
import ServiceLogAppResult from './ServiceLogAppResult'
import ServiceLogAppAPI from './custom/ServiceLogAppAPI'
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

  console.log(isDisabled)

  function fetch (newCurrent) {
    const context = newCurrent || current
    return ServiceLogAppAPI.fetch(
      context.environment,
      ServiceLogAppAPI.beforeFetch(context.queryText, page)
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

  return (
    <Split
      className='service-log-app split'
      sizes={[20, 80]}
      direction='vertical'
      minSize={100}
      gutterSize={1}
    >
      <ServiceLogAppHeader
        onUpdateResult={handleUpdateResult}
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
