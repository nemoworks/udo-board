import { useEffect, useState } from 'react'
import { Card, Tooltip, message } from 'antd'
import { Input, Switch } from '@material-ui/core'
import MonacoEditor from 'react-monaco-editor'
import { Icon, Page, XForm } from '@/components'
import { SchemaRQ, DeviceRQ } from '@/requests'
import { AddTitle } from '@/utils'
import { history } from 'umi'
import './index.less'

export default function ({
  match: {
    params: { id },
  },
}) {
  const [schema, setSchema] = useState({})
  const [name, setName] = useState('')
  const [tags, setTags] = useState([])
  const [content, setContent] = useState({})
  const [template, setTemplate] = useState(false)

  const [preview, setPreview] = useState(true)
  const [editorText, setEditorText] = useState('')

  useEffect(() => {
    SchemaRQ.get(id).then(schema => {
      let { schema: content } = schema
      content = content ? content : {}
      const name = id
      const tags: any = ['tag1']
      const template = true
      setName(name)
      setTags(tags)
      setContent(content)
      setTemplate(template)
      setSchema(schema)

      setEditorText(JSON.stringify(content, null, 4))
    })
  }, [])

  function updateSchema() {
    SchemaRQ.update(content, id).then(s => {
      message.success('保存成功', 0.5)
      setSchema(s)
    })
  }

  function editorChangeHandler(text: string) {
    try {
      const result = JSON.parse(text)
      let { properties } = result
      properties = AddTitle({ ...properties })
      result.properties = properties
      setContent(result)
    } catch (error) {
    } finally {
      setEditorText(text)
    }
  }

  function createDocument() {
    DeviceRQ.createFromSchema(schema).then(({ udoi }) => {
      message.success('创建成功', 0.5)
      history.push('/device/' + udoi)
    })
  }

  return (
    <Page className="schema single" title="UDO-Board | 类型编辑">
      <Card
        title={<Input value={name} onChange={e => setName(e.target.value)} />}
        extra={
          <>
            <Tooltip className="preview" overlay={preview ? '关闭预览' : '开启预览'}>
              <Icon type={preview ? 'icon-preview-on' : 'icon-preview-off'} onClick={_ => setPreview(!preview)} />
            </Tooltip>
            <Tooltip overlay="是否作为创建类型">
              <Switch checked={template} onChange={e => setTemplate(e.target.checked)} color="primary" />
            </Tooltip>
            <Tooltip overlay="保存">
              <Icon type="icon-store" onClick={updateSchema} />
            </Tooltip>
            <Tooltip overlay="以此类型创建">
              <Icon type="icon-create" onClick={createDocument} />
            </Tooltip>
          </>
        }
      >
        {preview ? (
          <XForm schema={content} />
        ) : (
          <MonacoEditor
            width="100%"
            height="100%"
            language="json"
            theme="vs-light"
            value={editorText}
            onChange={editorChangeHandler}
            options={{
              minimap: {
                showSlider: 'mouseover',
              },
            }}
          />
        )}
      </Card>
    </Page>
  )
}
