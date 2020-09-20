import React from 'react'

import { Button, ButtonGroup } from '@blueprintjs/core'
import { copyText, copyHtmlElement, convertNewlinesToBr, escape, printf, writeFile } from './utils'
import locale from './locale'

const { termInterface, termEndpoint, termDate, termDownload, termHeader, termMock, termRequest, termResponse, termMessage, termEmail, requestMessage, requestEmail, requestHeader } = locale

export default function ServiceLogRequestAction ({ request, response, props }) {
  const headerPasta = printf(
    requestHeader,
    termInterface,
    props.name,
    termEndpoint,
    props.endpoint,
    termDate,
    props.requestTime.dateText,
    props.requestTime.timeText,
    props.responseTime.timeText
  )

  const messagePasta = printf(
    requestMessage,
    headerPasta,
    termRequest,
    request,
    termResponse,
    response
  )

  const emailPasta = printf(
    requestEmail,
    convertNewlinesToBr(headerPasta),
    convertNewlinesToBr(request),
    convertNewlinesToBr(response)
  )

  function handleHeaderClick () {
    copyText(headerPasta)
  }

  function handleRequestClick () {
    copyText(request)
  }

  function handleResponseClick () {
    copyText(response)
  }

  function handleMessageClick () {
    copyText(messagePasta)
  }

  function handleEmailClick () {
    copyHtmlElement(emailPasta)
  }

  function handleMockClick () {
    copyText(escape(JSON.stringify(JSON.parse(props.response))))
  }

  function handleDownloadClick () {
    if (props.type === 'json') {
      writeFile(
        printf('%s-Request.json', props.name),
        request
      )
      writeFile(
        printf('%s-Response.json', props.name),
        response
      )
    } else {
      writeFile(
        printf('%s.xml', props.name),
        printf('%s\n%s', request, response),
        'text/xml'
      )
    }
  }

  return (
    <ButtonGroup minimal>
      <Button
        icon='clipboard'
        onClick={handleHeaderClick}
      >
        {termHeader}
      </Button>
      <Button
        icon='clipboard'
        onClick={handleRequestClick}
      >
        {termRequest}
      </Button>
      <Button
        icon='clipboard'
        onClick={handleResponseClick}
      >
        {termResponse}
      </Button>
      <Button
        icon='clipboard'
        onClick={handleMessageClick}
      >
        {termMessage}
      </Button>
      <Button
        icon='envelope'
        onClick={handleEmailClick}
      >
        {termEmail}
      </Button>
      <Button
        icon='hat'
        onClick={handleMockClick}
      >
        {termMock}
      </Button>
      <Button
        icon='download'
        onClick={handleDownloadClick}
      >
        {termDownload}
      </Button>
    </ButtonGroup>
  )
}
