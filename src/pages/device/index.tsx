import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, Dropdown, Menu, message, Tooltip, Modal } from 'antd'
import { Input } from '@material-ui/core'
import dayjs from 'dayjs'
import { Icon, Page, Map, Graph } from '@/components'
import { DeviceRQ, SchemaRQ } from '@/requests'
import { generateColumns, getLocation } from '@/utils'
import './index.less'

const { Item } = Menu

const viewModes = {
  table: {
    name: '表格',
    render({ deleteById, devices = [] }) {
      return (
        <Table
          rowSelection={{
            type: 'checkbox',
          }}
          rowKey="udoi"
          dataSource={devices}
          columns={generateColumns([
            ['创建时间', 'createOn', () => <span>{dayjs().format('YYYY/MM/DD hh:mm:ss')}</span>],
            [
              '资源名称',
              'name',
              (text: string, record: any, index: number) => (
                <span>
                  {record.schema.schema.title}/{record.udoi}
                </span>
              ),
            ],
            ['用户', 'user', (id: string = '') => (id ? <a href={'/user/' + id}>{id}</a> : <span>未指定</span>)],
            ['标签', 'tags', (tags: string[] = ['tag']) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)],
            [
              '',
              '',
              (text: string, record: any, index: number) => (
                <>
                  <Icon type="icon-edit" onClick={_ => history.push('/device/' + record.udoi)} />
                  <Icon type="icon-delete" onClick={_ => deleteById(record)} />
                </>
              ),
              100,
            ],
          ])}
        />
      )
    },
  },
  map: {
    name: '地图',
    render({ deleteById, devices }) {
      return <Map devices={devices} />
    },
  },
  time: {
    name: '时序',
    render({ devices }) {
      return <Graph devices={devices} />
    },
  },
}

export default function () {
  const [searchText, setSearchText] = useState('')

  const [schemas, setSchemas] = useState<any[]>([])
  const [devices, setDevices] = useState<any[]>([])

  const [sourceUrl, setSourceUrl] = useState('')
  const [schemaName, setSchemaName] = useState('')
  const [uriType, setUriType] = useState('')

  const [visible, setVisible] = useState(false)

  const [mode, setMode] = useState('map')

  const [location, setLocation] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    SchemaRQ.getAll().then(s => {
      setSchemas(s)
      DeviceRQ.getAll(s).then(d => {
        setDevices(d)
      })
    })
  }, [])

  function deleteById(record: any) {
    DeviceRQ.delete(record).then(_ => {
      message.success('删除成功', 0.5)
      setDevices(devices.filter(d => d.udoi !== record.udoi))
    })
  }

  useEffect(() => {
    if (location.length != 0) {
      DeviceRQ.createFromUrl(sourceUrl, schemaName, location, avatarUrl).then(d => {
        message.success('导入成功', 0.5)
        history.push('/device/' + d.id)
      })
    }
  }, [location])

  function createFromUrl() {
    getLocation(sourceUrl, setLocation)
    // SchemaRQ.createFromUrl(sourceUrl, schemaName).then(d => {
    //   message.success('导入成功', 0.5)
    //   getLocation(sourceUrl, d.id)

    // })
  }

  function createFromSchema(schema: any) {
    DeviceRQ.create(schema).then(({ udoi }) => {
      message.success('创建成功', 0.5)
      history.push('/device/' + udoi)
    })
  }

  return (
    <Page className="device" title="UDO-Board | 资源管理">
      <Card
        className={'mode-' + mode}
        title={
          <>
            <span className="text">资源</span>
            <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
          </>
        }
        extra={
          <>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  {Object.keys(viewModes).map(key => (
                    <Item key={key} onClick={_ => setMode(key)}>
                      {viewModes[key].name}
                    </Item>
                  ))}
                </Menu>
              }
            >
              <Icon type="icon-change" />
            </Dropdown>
            <Input value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} />
            <Tooltip overlay="URL 导入">
              <Icon type="icon-import" onClick={_ => sourceUrl !== '' && setVisible(true)} />
            </Tooltip>
            <Modal
              visible={visible}
              onCancel={_ => setVisible(false)}
              onOk={_ => {
                setVisible(false)
                createFromUrl()
              }}
            >
              <span>Name </span>
              <Input value={schemaName} onChange={e => setSchemaName(e.target.value)} />

              <span>avatarUrl </span>
              <Input value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
            </Modal>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  {schemas.length != 0
                    ? schemas.map(s => {
                        //console.log('sssad')
                        return (
                          <Item key={s.id} onClick={_ => createFromSchema(s)}>
                            {s.id}
                          </Item>
                        )
                      })
                    : null}
                </Menu>
              }
            >
              <Icon type="icon-create" />
            </Dropdown>
          </>
        }
      >
        {viewModes[mode].render({
          deleteById,
          devices,
        })}
      </Card>
    </Page>
  )
}
