import React, { useRef, useEffect, useState } from 'react'
import CodeMirror from 'codemirror'
import './styles/CodeMirrorEditor.css'
import 'codemirror/mode/sql/sql.js'

export default function CodeMirrorEditor (props) {
  const textareaRef = useRef(null)
  const [editor, setEditor] = useState(null)

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(textareaRef.current, {
      lineNumbers: true,
      mode: 'sql',
      theme: 'neo'
    })

    function handleChange () {
      const selection = editor.getSelection()
      props.onChange(
        selection.length
          ? selection
          : editor.getValue()
      )
    }

    editor.on('cursorActivity', handleChange)
    editor.on('change', handleChange)

    setEditor(editor)
  }, [])

  if (editor) {
    editor.setOption('readOnly', props.disabled || false)
    console.log(props.disabled)
  }

  return (
    <textarea ref={textareaRef} />
  )
}
