import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, Dropdown, Menu, message } from 'antd'
import { Input } from '@material-ui/core'
import dayjs from 'dayjs'
import { Icon, Page } from '@/components'
import { DeviceRQ, SchemaRQ } from '@/requests'
import { generateColumns } from '@/utils'
import './index.less'

const { Item } = Menu

export default function () {
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const [schemas, setSchemas] = useState<any[]>([])
  const [devices, setDevices] = useState<any[]>([])

  useEffect(() => {
    // DeviceRQ.getAll().then(setDevices)
    SchemaRQ.getAll().then(setSchemas)
    DeviceRQ.getAll(schemas).then(setDevices)
  }, [])

  //console.log(devices)

  function deleteById(id) {
    DeviceRQ.delete(id).then(_ => {
      message.success('删除成功', 0.5)
      setDevices(devices.filter(s => s.id !== id))
    })
  }

  function createFromSchema(schema: any) {
    DeviceRQ.create(schema).then(({ udoi }) => {
      message.success('创建成功', 0.5)
      history.push('/device/' + udoi)
    })
  }

  const columns = generateColumns([
    ['创建时间', 'createOn', () => <span>{dayjs().format('YYYY/MM/DD hh:mm:ss')}</span>],
    ['设备名称', 'name', (text: string, record: any, index: number) => <span>{record.udoi}</span>],
    ['用户', 'user', (id: string = 'user') => (id ? <a href={'/user/' + id}>{id}</a> : <span>未指定</span>)],
    ['标签', 'tags', (tags: string[] = ['tag']) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)],
    [
      '',
      '',
      (text: string, record: any, index: number) => (
        <>
          <Icon type="icon-edit" onClick={_ => history.push('/device/' + record.id)} />
          <Icon type="icon-delete" onClick={_ => deleteById(record.id)} />
        </>
      ),
      100,
    ],
  ])

  return (
    <Page className="device" title="UDO-Board | 设备管理">
      <Card
        title={
          <>
            <span className="text">设备</span>
            <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
          </>
        }
        extra={
          <Dropdown
            overlay={
              <Menu>
                {schemas
                  // .filter(s=>s.template)
                  .map(s => (
                    <Item key={s.id} onClick={_ => createFromSchema(s)}>
                      {s.id}
                    </Item>
                  ))}
              </Menu>
            }
            trigger={['click']}
          >
            <Icon type="icon-create" />
          </Dropdown>
        }
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: setSelectedRowKeys as any,
          }}
          rowKey="id"
          columns={columns}
          dataSource={devices}
        />
      </Card>
    </Page>
  )
}
