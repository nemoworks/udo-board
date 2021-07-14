import { Page } from '@/components'
import CodeMirror from '@uiw/react-codemirror'
import 'codemirror/keymap/sublime'
import 'codemirror/theme/monokai.css'
import { useState, useEffect } from 'react'
import mqtt from 'mqtt'
import { useModel } from 'umi'

export default function () {
  const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState')
  const [code, setCode] = useState<string>('')

  useEffect(() => {
    setCode(initialState)
  }, [initialState])

  return (
    <Page className="log" title="UDO-Board | 日志">
      <CodeMirror
        value={code}
        options={{
          theme: 'monokai',
          keyMap: 'sublime',
          tabsize: 0,
          mode: 'jsx',
          readOnly: true,
          autofouse: true,
        }}
        onChange={(instance, change) => {
          // console.log('onChange', instance.getDoc())
          instance.scrollTo(0, instance.getDoc().height)
        }}
      />
    </Page>
  )
}
