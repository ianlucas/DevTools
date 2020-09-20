import { useState } from 'react'

export default function useEventState (initialState) {
  const [value, setValue] = useState(initialState)

  function handleEvent (e) {
    setValue(e.target.value)
  }

  return [value, handleEvent, setValue]
}
