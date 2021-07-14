import MonacoEditor from 'react-monaco-editor'
import { Card, Table, Tag, message } from 'antd'
import { Icon, Page } from '@/components'
import { Button, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './index.less'
import { useState } from 'react'
import { DeviceRQ } from '@/requests'

export default function () {
  const [query, setQuery] = useState('')
  const [queryResult, setQueryResult] = useState('')
  function graphQL() {
    DeviceRQ.grapgQL(query).then(d => {
      // console.log(d)
      setQueryResult(JSON.stringify(d))
    })
  }

  return (
    <>
      <div className="left">
        <MonacoEditor
          width="100%"
          theme="vs-light"
          value={query}
          onChange={text => {
            setQuery(text)
          }}
          options={{
            minimap: {
              showSlider: 'mouseover',
            },
          }}
        />
      </div>
      <Tooltip title="search">
        <Button
          className="center"
          type="primary"
          shape="circle"
          icon={<SearchOutlined />}
          onClick={() => {
            graphQL()
          }}
        />
      </Tooltip>
      {/* <Button className="center"
                type="primary" icon={<SearchOutlined />}
                onClick={() => { console.log(query); graphQL() }}
            >
                Search
            </Button> */}
      <div className="right">
        {/* <MonacoEditor
                    width='100%'
                    language="json"
                    theme="vs-light"
                    value={queryResult}

                    options={{
                        minimap: {
                            showSlider: 'mouseover',
                        },
                    }}
                /> */}
        <span>{queryResult}</span>
      </div>
    </>
  )
}