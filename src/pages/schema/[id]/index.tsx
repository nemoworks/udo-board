import { useEffect, useState } from 'react'
import { Card, Tooltip, message } from 'antd'
import { Input, Switch } from '@material-ui/core'
import MonacoEditor from 'react-monaco-editor'
import { Icon, Page } from '@/components'
import { SchemaRQ } from '@/requests'
import './index.less'

export default function ({
  match: {
    params: { id },
  },
}) {
  const [schema, setSchema] = useState({})
  const [content, setContent] = useState({})
  const [name, setName] = useState('')
  const [tags, setTags] = useState([])
  const [template, setTemplate] = useState(false)

  function updateSchema() {
    SchemaRQ.update({
      ...schema,
      content,
      name,
      tags,
      template,
    }).then(setSchema)
  }

  useEffect(() => {
    SchemaRQ.get(id).then(schema => {
      const { content, name, tags, template } = schema

      setContent(content)
      setName(name)
      setTags(tags)
      setTemplate(template)
      setSchema(schema)
    })
  }, [])

  return (
    <Page className="schema single" title="UDO-Board | 模板编辑">
      <Card
        title={<Input value={name} onChange={e => setName(e.target.value)} />}
        extra={
          <>
            <Tooltip overlay="是否作为模板">
              <Switch checked={template} onChange={e => setTemplate(e.target.checked)} color="primary" />
            </Tooltip>
            <Tooltip overlay="保存">
              <Icon type="icon-store" onClick={updateSchema} />
            </Tooltip>
          </>
        }
      >
        <MonacoEditor width="100%" height="100%" language="json" theme="vs-light" />
      </Card>
    </Page>
  )
}
