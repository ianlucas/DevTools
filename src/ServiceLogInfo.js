import React from 'react'

import './styles/ServiceLogInfo.css'

export default function ServiceLogInfo (props) {
  return (
    <table className='service-log-info'>
      <tbody>
        <tr>
          {props.infobox.map((info, index) => (
            <td key={index}>
              <em>{info.key}</em> <data>{info.value}</data>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
