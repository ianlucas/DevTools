import React from 'react'

import { InputGroup, Menu, MenuItem, Overlay } from '@blueprintjs/core'

import './styles/QuickOpenTab.css'

export default function QuickOpenTab () {
  return null
  return (
    <Overlay isOpen usePortal>
      <div className='quick-open-tab-container'>
        <div className='quick-open-tab-box'>
          <InputGroup />
          <Menu>
            <MenuItem
              text={(
                <>
                  <div>Teste</div>
                  <small className='bp3-text-muted'>Teste</small>
                </>
              )}
            />
          </Menu>
        </div>
      </div>
    </Overlay>
  )
}
