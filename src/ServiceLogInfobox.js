import React from 'react'

import './styles/ServiceLogInfobox.css'

export default function ServiceLogInfobox (props) {
  if (!props.info) {
    return null
  }

  return (
    <table className='service-log-infobox'>
      <tbody>
        {props.info.map(({ key, value }) => (
          <tr
            key={key}
          >
            <th>{key}</th>
            {Array.isArray(value) ? (
              <td>
                <ol>
                  {value.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ol>
              </td>
            ) : (
              <td>
                {value}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
