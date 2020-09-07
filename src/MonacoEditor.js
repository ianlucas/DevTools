import React from 'react'
import Monaco from 'react-monaco-editor'

export default function MonacoEditor (props) {
  function handleEditorMount (editor) {
    editor.onDidChangeCursorSelection((e) => {
      const selected = editor.getModel().getValueInRange(editor.getSelection())
      console.log(selected)
    })
  }

  return (
    <Monaco
      {...props}
      editorDidMount={handleEditorMount}
    />
  )
}
