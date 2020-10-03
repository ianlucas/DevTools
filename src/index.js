import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import './styles/index.css'

dayjs.extend(relativeTime)

ReactDOM.render(<App />, document.getElementById('root'))
