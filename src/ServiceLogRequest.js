import React from 'react'
import { ButtonGroup, Button, Callout } from '@blueprintjs/core'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { magula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import ServiceLogInfobox from './ServiceLogInfobox'
import { beautifier } from './utils'
import './styles/ServiceLogRequest.css'

export default function ServiceLogRequest (props) {
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
          <Button icon='clipboard'>
            Cabeçalho
          </Button>
          <Button icon='clipboard'>
            Request
          </Button>
          <Button icon='clipboard'>
            Response
          </Button>
          <Button icon='clipboard'>
            Mensagem
          </Button>
          <Button icon='envelope'>
            Email
          </Button>
          <Button icon='hat'>
            Mock
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
              <SyntaxHighlighter language={props.type} style={magula}>{beautifier(props.type, props.request)}</SyntaxHighlighter>
            </div>
          </div>
          <div className='service-log-request-payload'>
            <div className='service-log-request-payload-code'>
              <SyntaxHighlighter language={props.type} style={magula}>{beautifier(props.type, props.response)}</SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
