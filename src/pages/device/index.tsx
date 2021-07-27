import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, Dropdown, Menu, message, Tooltip, Modal, Select, Radio, Row, Col, Image } from 'antd'
import { Input } from '@material-ui/core'
import dayjs from 'dayjs'
import { Icon, Page, Map, Graph, GraphQL, DashBoard } from '@/components'
import { DeviceRQ, SchemaRQ } from '@/requests'
import { generateColumns, getLocation } from '@/utils'
import { useModel } from 'umi'
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
    render({ deleteById, devices, displayDiagram }) {
      return (
        <Row className="rows">
          <Col style={{ height: '100%' }} span={14}>
            <DashBoard devices={devices} displayDiagram={displayDiagram} />
          </Col>
          <Col style={{ height: '100%' }} span={10}>
            <Map devices={devices} />
          </Col>
        </Row>
      )
    },
  },
  graphQL: {
    name: 'DOQL',
    render() {
      return <GraphQL />
    },
  },
}

export default function ({ setLayoutDisplay }) {
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
  const [createLng, setCreateLng] = useState('0')
  const [createLat, setCreateLat] = useState('0')
  const [value, setValue] = useState(1)

  const [isContainUri, setIsContainUri] = useState(0)

  const [diagramModal, setDiagramModal] = useState(false)
  const [diagramSrc, setDiagramSrc] = useState('')

  const [createSelectLength, setCreateSelectLength] = useState('250px')

  const [layoutDisplayVisible, setLayoutDisplayVisible] = useState(true)

  const { setLayoutVisible } = useModel('layoutVisible', ret => ({
    setLayoutVisible: ret.setLayoutVisible,
  }))

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

  function displayDiagram(data: any) {
    if (Object.keys(data).find(k => k == 'diagram')) {
      setDiagramSrc(data.diagram)
      setDiagramModal(true)
    }
  }

  function deleteById(record: any) {
    DeviceRQ.delete(record).then(_ => {
      message.success('删除成功', 0.5)
      setDevices(devices.filter(d => d.udoi !== record.udoi))
    })
  }

  useEffect(() => {
    if (location.length != 0) {
      //console.log(location)
      DeviceRQ.inferAndCreateFromUrl(createUrl, createName, location, createAvatarUrl, gatewayType).then(d => {
        message.success('导入成功', 0.5)
        history.push('/device/' + d.id)
      })
    }
  }, [location])

  function create() {
    if (createType == 'schema') {
      if (createSchema != '') {
        const schema: any = schemas.find(s => (s.id = createSchema))
        if (isContainUri == 1) {
          DeviceRQ.createFromUrlAndSchema(schema, gatewayType, createUrl).then(({ udoi }) => {
            message.success('创建成功', 0.5)
            history.push('/device/' + udoi)
          })
        } else if (isContainUri == 0) {
          DeviceRQ.createFromSchema(schema).then(({ udoi }) => {
            message.success('创建成功', 0.5)
            history.push('/device/' + udoi)
          })
        }
      }
    } else if (createType == 'url') {
      if (createUrl != '') {
        if (value == 1) {
          getLocation(createUrl, setLocation)
        } else if (value == 0) {
          DeviceRQ.inferAndCreateFromUrl(
            createUrl,
            createName,
            createLng + ',' + createLat,
            createAvatarUrl,
            gatewayType
          ).then(d => {
            message.success('导入成功', 0.5)
            history.push('/device/' + d.id)
          })
        }
      }
    }
  }

  return (
    <Page className="device" title="UDO-Board | 资源管理">
      <Card
        className={'mode-' + mode}
        bordered={true}
        title={
          <>
            <span className="text">平台概览</span>
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
              <table className="device-import-modal">
                <tr>
                  <td>
                    <span>推导类型: </span>
                  </td>
                  <td>
                    {/* <Select style={{ fontSize: 'small' }} value={createType} onChange={t => setCreateType(t)}>
                      {['schema', 'url'].map(t => (
                        <Select.Option key={t} value={t}>
                          {t}
                        </Select.Option>
                      ))}
                    </Select> */}
                    <Radio.Group
                      onChange={e => {
                        setCreateType(e.target.value)
                      }}
                      value={createType}
                    >
                      <Radio style={{ fontSize: 'small' }} value={'url'}>
                        是
                      </Radio>
                      <Radio style={{ fontSize: 'small' }} value={'schema'}>
                        否
                      </Radio>
                    </Radio.Group>
                  </td>
                </tr>
                {createType == 'url' ? (
                  <>
                    <tr>
                      <td>
                        <span>协议: </span>
                      </td>
                      <td>
                        <Select style={{ fontSize: 'small' }} value={gatewayType} onChange={t => setGatewayType(t)}>
                          {['HTTP', 'MQTT'].map(t => (
                            <Select.Option key={t} value={t}>
                              {t}
                            </Select.Option>
                          ))}
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>资源地址:</span>
                      </td>
                      <td>
                        <Input value={createUrl} onChange={e => setCreateUrl(e.target.value)}></Input>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>类型名称:</span>
                      </td>
                      <td>
                        <Input value={createName} onChange={e => setCreateName(e.target.value)}></Input>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>图标地址:</span>
                      </td>
                      <td>
                        <Input value={createAvatarUrl} onChange={e => setCreateAvatarUrl(e.target.value)}></Input>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>位置:</span>
                      </td>
                      <td>
                        <Radio.Group
                          onChange={e => {
                            setValue(e.target.value)
                          }}
                          value={value}
                        >
                          <Radio style={{ fontSize: 'small' }} value={1}>
                            推导
                          </Radio>
                          <Radio style={{ fontSize: 'small' }} value={0}>
                            默认
                          </Radio>
                        </Radio.Group>
                      </td>
                    </tr>
                    {value == 0 ? (
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
                  </>
                ) : createType == 'schema' ? (
                  <>
                    <tr>
                      <td>
                        <span>资源模型:</span>
                      </td>
                      <td>
                        <Select
                          style={{ width: createSelectLength, fontSize: 'small' }}
                          value={createSchema}
                          onChange={s => {
                            setCreateSchema(s)
                            setCreateSelectLength('auto')
                          }}
                        >
                          {schemas.map(s => (
                            <Select.Option key={s.id} value={s.id}>
                              {s.schema.title + '/' + s.id}
                            </Select.Option>
                          ))}
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>资源地址: </span>
                      </td>
                      <td>
                        <Radio.Group
                          onChange={e => {
                            setIsContainUri(e.target.value)
                          }}
                          value={isContainUri}
                        >
                          <Radio style={{ fontSize: 'small' }} value={1}>
                            包含
                          </Radio>
                          <Radio style={{ fontSize: 'small' }} value={0}>
                            不包含
                          </Radio>
                        </Radio.Group>
                      </td>
                    </tr>
                    {isContainUri == 1 ? (
                      <>
                        <tr>
                          <td>
                            <span>协议: </span>
                          </td>
                          <td>
                            <Select style={{ fontSize: 'small' }} value={gatewayType} onChange={t => setGatewayType(t)}>
                              {['HTTP', 'MQTT'].map(t => (
                                <Select.Option key={t} value={t}>
                                  {t}
                                </Select.Option>
                              ))}
                            </Select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>资源地址:</span>
                          </td>
                          <td>
                            <Input value={createUrl} onChange={e => setCreateUrl(e.target.value)}></Input>
                          </td>
                        </tr>
                      </>
                    ) : null}
                  </>
                ) : null}

                {/* <tr>
                  <td>
                    <span>协议: </span>
                  </td>
                  <td>
                    <Select style={{ fontSize: 'small' }} value={gatewayType} onChange={t => setGatewayType(t)}>
                      {['HTTP', 'MQTT'].map(t => (
                        <Select.Option key={t} value={t}>
                          {t}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                </tr> */}
                {/* {createType == 'schema' ? (
                  <tr>
                    <td>
                      <span>资源模型:</span>
                    </td>
                    <td>
                      <Select
                        style={{ width: createSelectLength, fontSize: 'small' }}
                        value={createSchema}
                        onChange={s => {
                          setCreateSchema(s)
                          setCreateSelectLength('auto')
                        }}
                      >
                        {schemas.map(s => (
                          <Select.Option key={s.id} value={s.id}>
                            {s.schema.title + '/' + s.id}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                  </tr>
                ) : null} */}
                {/* {createType == 'url' ? (
                  <>
                    <tr>
                      <td>
                        <span>类型名称:</span>
                      </td>
                      <td>
                        <Input value={createName} onChange={e => setCreateName(e.target.value)}></Input>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>图标地址:</span>
                      </td>
                      <td>
                        <Input value={createAvatarUrl} onChange={e => setCreateAvatarUrl(e.target.value)}></Input>
                      </td>
                    </tr>
                  </>
                ) : null} */}
                {/* <tr>
                  <td>
                    <span>资源地址:</span>
                  </td>
                  <td>
                    <Input value={createUrl} onChange={e => setCreateUrl(e.target.value)}></Input>
                  </td>
                </tr> */}
                {/* <tr>
                  <td>
                    <span>位置:</span>
                  </td>
                  <td>
                    <Radio.Group
                      onChange={e => {
                        setValue(e.target.value)
                      }}
                      value={value}
                    >
                      <Radio style={{ fontSize: 'small' }} value={1}>
                        推导
                      </Radio>
                      <Radio style={{ fontSize: 'small' }} value={0}>
                        默认
                      </Radio>
                    </Radio.Group>
                  </td>
                </tr> */}
                {/* {value == 0 ? (
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
                ) : null} */}
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

            <Modal
              visible={diagramModal}
              width={700}
              onCancel={_ => setDiagramModal(false)}
              onOk={_ => {
                setDiagramModal(false)
              }}
              bodyStyle={{ textAlign: 'center' }}
            >
              <Image
                width={600}
                src={diagramSrc}
                alt="diagram"
                fallback="data:image/png;base64,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"
              />
            </Modal>
            <Icon
              type={layoutDisplayVisible ? 'icon-fangda' : 'icon-suoxiao'}
              onClick={_ => {
                setLayoutVisible(!layoutDisplayVisible)
                setLayoutDisplayVisible(!layoutDisplayVisible)
              }}
            ></Icon>
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
          displayDiagram,
        })}
      </Card>
    </Page>
  )
}
