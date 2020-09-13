import React from 'react'
import escape from 'js-string-escape'
import { ButtonGroup, Button, Callout } from '@blueprintjs/core'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { magula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import ServiceLogInfobox from './ServiceLogInfobox'
import { beautifier, copyText, copyHtmlElement, writeFile } from './utils'
import './styles/ServiceLogRequest.css'

export default function ServiceLogRequest (props) {
  const beautyRequest = beautifier(props.type, props.request)
  const beautyResponse = beautifier(props.type, props.response)
  const headerText = [
    `Interface: ${props.name}`,
    `Endpoint: ${props.endpoint}`,
    `Date: ${props.requestTime.dateText} ${props.requestTime.timeText}-${props.responseTime.timeText}`
  ].join('\n')

  function copyHeader () {
    copyText(headerText)
  }

  function copyRequest () {
    copyText(beautyRequest)
  }

  function copyResponse () {
    copyText(beautyResponse)
  }

  function copyMessage () {
    copyText([
      headerText,
      '[Request]',
      beautyRequest,
      '[Response]',
      beautyResponse
    ].join('\n'))
  }

  function copyEmail () {
    let body = ''
    body += `<p>${headerText.replace(/\n/g, '<br>')}</p>`
    body += '<p>'
    body += '<table style="border-collapse: collapse; white-space: pre; border: 1px solid #000;">'
    body += '<tr>'
    body += `<td style="vertical-align: top; border: 1px solid #000; padding: 4px;">${beautyRequest.replace(/\n/g, '<br>')}</td>`
    body += `<td style="vertical-align: top; border: 1px solid #000; padding: 4px;">${beautyResponse.replace(/\n/g, '<br>')}</td>`
    body += '</tr>'
    body += '</table>'
    body += '</p>'
    copyHtmlElement(body)
  }

  function copyMock () {
    copyText(escape(JSON.stringify(beautyResponse)))
  }

  function download () {
    if (props.type === 'json') {
      writeFile(`${props.name}-Request.json`, beautyRequest)
      writeFile(`${props.name}-Response.json`, beautyResponse)
    } else {
      writeFile(`${props.name}.xml`, `${beautyRequest}\n${beautyResponse}`, 'text/xml')
    }
  }

  return (
    <>
      <hr />
      <section className='service-log-request'>
        <header className='service-log-request-header'>
          <p><em>Interface:</em> {props.name}</p>
          <p><em>Endpoint:</em> {props.endpoint}</p>
          <p><em>Data:</em> {props.requestTime.dateText} {props.requestTime.timeText}-{props.responseTime.timeText}</p>
        </header>
        <ButtonGroup minimal>
          <Button icon='clipboard' onClick={copyHeader}>
            Header
          </Button>
          <Button icon='clipboard' onClick={copyRequest}>
            Request
          </Button>
          <Button icon='clipboard' onClick={copyResponse}>
            Response
          </Button>
          <Button icon='clipboard' onClick={copyMessage}>
            Message
          </Button>
          <Button icon='envelope' onClick={copyEmail}>
            Email
          </Button>
          <Button icon='hat' onClick={copyMock}>
            Mock
          </Button>
          <Button icon='download' onClick={download}>
            Download
          </Button>
        </ButtonGroup>
        {props.alerts && (
          <Callout intent='primary'>
            {props.alerts.map((line, key) => (
              <div key={key}>{line}</div>
            ))}
          </Callout>
        )}
        {props.errors && (
          <Callout intent='danger'>
            {props.errors.map((line, key) => (
              <div key={key}>{line}</div>
            ))}
          </Callout>
        )}
        {props.info && <ServiceLogInfobox info={props.info} />}
        <div className='service-log-request-payloads'>
          <div className='service-log-request-payload'>
            <div className='service-log-request-payload-code'>
              <SyntaxHighlighter language={props.type} style={magula}>{beautyRequest}</SyntaxHighlighter>
            </div>
          </div>
          <div className='service-log-request-payload'>
            <div className='service-log-request-payload-code'>
              <SyntaxHighlighter language={props.type} style={magula}>{beautyResponse}</SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
