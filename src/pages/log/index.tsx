import { Page } from '@/components'
import CodeMirror from '@uiw/react-codemirror'
import 'codemirror/theme/rubyblue.css'
import { useState, useEffect } from 'react'
import mqtt from 'mqtt'
import { useModel } from 'umi'

export default function () {
  // const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState')
  const [code, setCode] = useState<string>('')
  const { log } = useModel('log', ret => ({
    log: ret.log,
  }))
  useEffect(() => {
    setCode(log)
  }, [log])

  // useEffect(() => {
  //   if (initialState != undefined) {
  //     setCode(initialState)
  //   }

  // }, [initialState])

  return (
    <Page className="log" title="UDO-Board | 日志">
      <CodeMirror
        value={code}
        options={{
          theme: 'rubyblue',
          mode: 'jsx',
          readOnly: true,
        }}
        onChange={(instance, change) => {
          // console.log('onChange', instance.getDoc())
          instance.scrollTo(0, instance.getDoc().height)
        }}
      />
    </Page>
  )
}
