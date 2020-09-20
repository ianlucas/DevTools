import React from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import ServiceLogInfobox from './ServiceLogInfobox'
import ServiceLogRequestAction from './ServiceLogRequestAction'
import ServiceLogRequestCallout from './ServiceLogRequestCallout'

import { magula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { beautify } from './utils'

import scritps from './locale'

import './styles/ServiceLogRequest.css'

const { termInterface, termEndpoint, termDate } = scritps

export default function ServiceLogRequest (props) {
  const request = beautify(props.type, props.request)
  const response = beautify(props.type, props.response)

  return (
    <>
      <hr />
      <section className='service-log-request'>
        <header className='service-log-request-header'>
          <p><em>{termInterface}:</em> {props.name}</p>
          <p><em>{termEndpoint}:</em> {props.endpoint}</p>
          <p><em>{termDate}:</em> {props.requestTime.dateText} {props.requestTime.timeText}-{props.responseTime.timeText}</p>
        </header>
        <ServiceLogRequestAction
          request={request}
          response={response}
          props={props}
        />
        <ServiceLogRequestCallout
          intent='primary'
          list={props.alerts}
        />
        <ServiceLogRequestCallout
          intent='danger'
          list={props.errors}
        />
        <ServiceLogInfobox
          info={props.info}
        />
        <div className='service-log-request-payloads'>
          <div className='service-log-request-payload'>
            <div className='service-log-request-payload-code'>
              <SyntaxHighlighter
                language={props.type}
                style={magula}
              >
                {request}
              </SyntaxHighlighter>
            </div>
          </div>
          <div className='service-log-request-payload'>
            <div className='service-log-request-payload-code'>
              <SyntaxHighlighter
                language={props.type}
                style={magula}
              >
                {response}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
