import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, Dropdown, Menu, message, Tooltip, Modal, Select, Radio } from 'antd'
import { Input } from '@material-ui/core'
import dayjs from 'dayjs'
import { Icon, Page, Map, Graph, GraphQL } from '@/components'
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
  graphQL: {
    name: 'DOQL',
    render() {
      return <GraphQL />
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
  const [typeVisible, setTypeVisialbe] = useState(false)

  const [visible, setVisible] = useState(false)

  const [mode, setMode] = useState('map')

  const [location, setLocation] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const [selectedId, setSelectId] = useState('')

  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [createType, setCreateType] = useState('schema')
  const [createSchema, setCreateSchema] = useState('')
  const [gatewayType, setGatewayType] = useState('HTTP')
  const [createUrl, setCreateUrl] = useState('')
  const [createName, setCreateName] = useState('')
  const [createAvatarUrl, setCreateAvatarUrl] = useState('')
  const [createLng, setCreateLng] = useState('')
  const [createLat, setCreateLat] = useState('')
  const [value, setValue] = useState(1)

  useEffect(() => {
    SchemaRQ.getAll().then(s => {
      setSchemas(s)
    })
  }, [])

  useEffect(() => {
    if (schemas.length != 0) {
      DeviceRQ.getAll(schemas).then(d => {
        setDevices(d)
      })
    }
  }, [schemas])

  // useEffect(() => {
  //   if (schemas.length != 0) {
  //     const InterVal = setInterval(() => {
  //       DeviceRQ.getAll(schemas).then(d => {
  //         setDevices(d)
  //       })
  //     }, 10000)
  //     return () => {
  //       clearInterval(InterVal)
  //     }

  //   }

  // }, [schemas])

  function deleteById(record: any) {
    DeviceRQ.delete(record).then(_ => {
      message.success('删除成功', 0.5)
      setDevices(devices.filter(d => d.udoi !== record.udoi))
    })
  }

  useEffect(() => {
    if (location.length != 0) {
      //console.log(location)
      DeviceRQ.createFromUrl(createUrl, createName, location, createAvatarUrl, gatewayType).then(d => {
        message.success('导入成功', 0.5)
        history.push('/device/' + d.id)
      })
    }
  }, [location])

  function createFromUrl() {
    if (value == 0) {
      getLocation(createUrl, setLocation)
    } else if (value == 1) {
      DeviceRQ.createFromUrl(createUrl, createName, createLng + ',' + createLat, createAvatarUrl, gatewayType).then(
        d => {
          message.success('导入成功', 0.5)
          history.push('/device/' + d.id)
        }
      )
    }
    // SchemaRQ.createFromUrl(sourceUrl, schemaName).then(d => {
    //   message.success('导入成功', 0.5)
    //   getLocation(sourceUrl, d.id)

    // })
  }

  function createFromSchema(schema: any) {
    DeviceRQ.create(schema, gatewayType, createUrl).then(({ udoi }) => {
      message.success('创建成功', 0.5)
      history.push('/device/' + udoi)
    })
  }

  function create() {
    if (createType == 'schema') {
      if (createSchema != '') {
        // console.log(createSchema, gatewayType)
        createFromSchema(schemas.find(s => (s.id = createSchema)))
      }
    } else if (createType == 'url') {
      if (createUrl != '') {
        // console.log(createUrl, createName, createAvatarUrl, gatewayType)
        createFromUrl()
      }
    }
  }

  return (
    <Page className="device" title="UDO-Board | 资源管理">
      <Card
        className={'mode-' + mode}
        title={
          <>
            <span className="text">资源</span>
            {/* <Input value={searchText} onChange={e => setSearchText(e.target.value)} /> */}
          </>
        }
        extra={
          <>
            <Icon
              type="icon-create"
              onClick={_ => {
                setCreateModalVisible(true)
              }}
            ></Icon>
            <Modal
              visible={createModalVisible}
              onCancel={_ => setCreateModalVisible(false)}
              onOk={_ => {
                setCreateModalVisible(false)
                create()
              }}
            >
              <table>
                <tr>
                  <td>
                    <span>导入方式: </span>
                  </td>
                  <td>
                    <Select value={createType} onChange={t => setCreateType(t)}>
                      {['schema', 'url'].map(t => (
                        <Select.Option key={t} value={t}>
                          {t}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>gatewayType: </span>
                  </td>
                  <td>
                    <Select value={gatewayType} onChange={t => setGatewayType(t)}>
                      {['HTTP', 'MQTT'].map(t => (
                        <Select.Option key={t} value={t}>
                          {t}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                </tr>
                {createType == 'schema' ? (
                  <tr>
                    <td>
                      <span>schema:</span>
                    </td>
                    <td>
                      <Select value={createSchema} onChange={s => setCreateSchema(s)}>
                        {schemas.map(s => (
                          <Select.Option key={s.id} value={s.id}>
                            {s.schema.title + '/' + s.id}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                  </tr>
                ) : null}
                {createType == 'url' ? (
                  <>
                    <tr>
                      <td>
                        <span>name:</span>
                      </td>
                      <td>
                        <Input value={createName} onChange={e => setCreateName(e.target.value)}></Input>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>avatarUrl:</span>
                      </td>
                      <td>
                        <Input value={createAvatarUrl} onChange={e => setCreateAvatarUrl(e.target.value)}></Input>
                      </td>
                    </tr>
                  </>
                ) : null}
                <tr>
                  <td>
                    <span>url:</span>
                  </td>
                  <td>
                    <Input value={createUrl} onChange={e => setCreateUrl(e.target.value)}></Input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>填写location:</span>
                  </td>
                  <td>
                    <Radio.Group
                      onChange={e => {
                        setValue(e.target.value)
                      }}
                      value={value}
                    >
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                {value == 1 ? (
                  <>
                    <tr>
                      <td>
                        <span>经度:</span>
                      </td>
                      <td>
                        <Input value={createLng} onChange={e => setCreateLng(e.target.value)}></Input>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>纬度:</span>
                      </td>
                      <td>
                        <Input value={createLat} onChange={e => setCreateLat(e.target.value)}></Input>
                      </td>
                    </tr>
                  </>
                ) : null}
              </table>
            </Modal>

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
            {/* <Input value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} />
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
            </Modal> */}
            {/* <Modal
              visible={typeVisible}
              onCancel={_ => setTypeVisialbe(false)}
              onOk={_ => {
                setTypeVisialbe(false)
                createFromSchema(schemas.find(s => s.id = selectedId))
              }}
            >

              <span>uriType </span>
              <Input value={uriType} onChange={e => setUriType(e.target.value)} />
            </Modal>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  {schemas.length != 0
                    ? schemas.map(s => {
                      //console.log('sssad')
                      return (
                        <Item key={s.id} onClick={_ => { setTypeVisialbe(true); setSelectId(s.id) }}>
                          {s.id}
                        </Item>
                      )
                    })
                    : null}
                </Menu>
              }
            >
              <Icon type="icon-create" />
            </Dropdown> */}
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
