import React from 'react'

import Split from 'react-split'

import './styles/Split.css'

export default function SplitWrapper (props) {
  return (
    <Split className='Split' {...props}>
      {props.children}
    </Split>
  )
}
