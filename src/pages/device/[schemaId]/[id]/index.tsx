import { useEffect, useState } from 'react'
import { Card, Tooltip, Select, message } from 'antd'
import { Input } from '@material-ui/core'
import { Page, Icon, XForm } from '@/components'
import { DeviceRQ, SchemaRQ, UserRQ } from '@/requests'

const { Option } = Select

export default function ({
  match: {
    params: { schemaId, id },
  },
}) {
  const [device, setDevice] = useState({})
  const [name, setName] = useState('')
  const [schema, setSchema] = useState({})
  const [content, setContent] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])

  function updateDevice() {
    // console.log(user)
    DeviceRQ.update(content, id, schemaId, schema).then(u => {
      message.success('保存成功', 0.5)
      setDevice(u)
    })
  }

  useEffect(() => {
    UserRQ.getAll().then(setUsers)

    SchemaRQ.get(schemaId).then(s => {
      const { schema: schemaContent } = s
      DeviceRQ.get(id, schemaContent).then(d => {
        setName(id)
        setDevice(d)
        setSchema(schemaContent)
        setContent(d)
      })
    })
    // DeviceRQ.get(id).then(device => {
    //     const { name, content, user, schema: schemaId } = device

    //     SchemaRQ.get(schemaId).then(schema => {
    //       setDevice(device)
    //       setUser(user)
    //       setName(id)
    //       setContent(content)
    //       setSchema(schema.content)
    //     })
    // })
  }, [])

  return (
    <Page className="device single" title="UDO-Board | 设备编辑">
      <Card
        title={<Input value={name} onChange={e => setName(e.target.value)} />}
        extra={
          <>
            <Select value={user ? user : 'undefined'} onChange={u => setUser(u)}>
              {users.map(u => (
                <Option key={u.id} value={u.id}>
                  {u.name}
                </Option>
              ))}
            </Select>
            <Tooltip overlay="保存">
              <Icon type="icon-store" onClick={updateDevice} />
            </Tooltip>
          </>
        }
      >
        <XForm schema={schema} formData={content} onChange={setContent} />
      </Card>
    </Page>
  )
}
