import React from 'react'

import { Callout } from '@blueprintjs/core'

export default function ServiceLogRequestCallout (props) {
  if (!props.list) {
    return null
  }

  return (
    <Callout intent={props.intent}>
      {props.list.map((message, key) => (
        <div key={key}>{message}</div>
      ))}
    </Callout>
  )
}
