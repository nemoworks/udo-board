import { useEffect, useState } from 'react'
import { Card, Tooltip, message, Modal, Button, Drawer, Dropdown, Menu, Table } from 'antd'
import { Input } from '@material-ui/core'
import { Page, Icon, DeviceCard, DeviceSelection, QueryBuilder, Graph, Filter } from '@/components'
import { ApplicationContextRQ, DeviceRQ, SchemaRQ } from '@/requests'
import './index.less'
import { generateColumns } from '@/utils'
import dayjs from 'dayjs'
import { Tag } from 'antd'

const { Item } = Menu

const viewModes = {
  card: {
    name: '卡片',
    // render() {
    //   return <div>卡片</div>
    // },
    render({
      names,
      setNames,
      contextId,
      deleteApplication,
      applicationContext,
      setFilter,
      setSelectedUdoId,
      updateApplicationContext,
    }) {
      return (
        <Filter
          names={names}
          setNames={setNames}
          contextId={contextId}
          deleteApplication={deleteApplication}
          applicationContext={applicationContext}
          setFilter={setFilter}
          setSelectedUdoId={setSelectedUdoId}
          updateApplicationContext={updateApplicationContext}
        />
      )
    },
  },
  graph: {
    name: '通信图',
    render({ context }) {
      return <Graph context={{ context }} />
    },
  },
}

export default function ({
  match: {
    params: { id },
  },
}) {
  const [applicationContext, setApplicationContext] = useState({})
  const [name, setName] = useState('')
  const [devices, setDevices] = useState<any[]>([])
  const [mode, setMode] = useState('card')
  const [filter, setFilter] = useState<any>({})
  const [open, setOpen] = useState(false)

  const [names, setNames] = useState<string[]>([])
  const [contextId, setContextId] = useState(id)

  const [context, setContext] = useState<any[]>([])
  const [sourceName, setSourceName] = useState('')

  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [createDevices, setCreateDevices] = useState<any[]>([])
  const [schemas, setSchemas] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const [selectedUdoId, setSelectedUdoId] = useState('')

  const [cxtAddId, setCxtAddId] = useState('')

  useEffect(() => {
    if (cxtAddId != '') {
      const ns: string[] = [...names]
      ns.push(cxtAddId)
      setNames(ns)
    }
  }, [cxtAddId])

  useEffect(() => {
    // setDevices(devices.map(d => (d.id == editingDevice.id ? editingDevice : d)))
    if (Object.keys(filter).length != 0) {
      //console.log(editingDevice)
      const {
        query: { rules },
      } = filter
      //console.log(rules)
      let data = {}
      for (let r of rules) {
        const { operator, field, value } = r
        let result = {}
        result[operator] = []
        //console.log(result)
        let re = {}
        re[field] = value
        result[operator].push(re)
        //console.log(result)
        data = { ...data, ...result }
      }
      // console.log(data)
      setApplicationContext(data)
    }
  }, [filter])

  function updateApplicationContext(udoId: string) {
    // console.log(id, applicationContext, udoId)
    ApplicationContextRQ.update(id, applicationContext, udoId).then(u => {
      message.success('保存成功', 0.5)
      setApplicationContext(u)
    })
  }
  function addApplication(name: string) {
    ApplicationContextRQ.addUdo(name, id).then(d => {
      message.success('添加成功', 0.5)
      const ns: string[] = [...names]
      ns.push(name)
      setNames(ns)
    })
  }

  function deleteApplication(name: string) {
    ApplicationContextRQ.deleteUdo(name, id).then(d => {
      message.success('添加成功', 0.5)
      const ns: string[] = [...names]

      setNames(ns.filter(n => n != name))
    })
  }

  function deleteDeviceById(d: string) {
    setDevices(devices.filter(device => device !== d))
  }

  useEffect(() => {
    ApplicationContextRQ.get(id).then(ns => {
      setNames(ns)
      for (let i of ns) {
        ApplicationContextRQ.getRule(id, i).then(d => {
          const cxt = [...context]
          cxt.push(JSON.parse(d))
          setContext(cxt)
        })
      }
    })
  }, [])

  useEffect(() => {
    SchemaRQ.getAll().then(s => {
      setSchemas(s)
    })
  }, [names])

  useEffect(() => {
    if (schemas.length != 0) {
      DeviceRQ.getAll(schemas).then(d => {
        let ds = d
        for (let i of names) {
          ds = ds.filter(d => d.udoi !== i)
        }
        setDevices(ds)
      })
    }
  }, [schemas])
  // console.log('devices', devices)
  // console.log('schemas', schemas)
  // console.log('names', names)
  return (
    <>
      <Page className="application_context single" title="UDO-Board | 场景编辑">
        <Card
          className="grid"
          title={<Input value={name} onChange={e => setName(e.target.value)} />}
          extra={
            <>
              {/* <Input value={sourceName} onChange={e => setSourceName(e.target.value)} />
              <Tooltip overlay="增加">
                <Icon type="icon-create" onClick={() => { addApplication(sourceName) }} />
              </Tooltip> */}
              <Tooltip overlay="增加">
                <Icon
                  type="icon-create"
                  onClick={() => {
                    setCreateModalVisible(true)
                  }}
                />
              </Tooltip>
              <Modal
                visible={createModalVisible}
                onCancel={_ => setCreateModalVisible(false)}
                onOk={_ => {
                  setCreateModalVisible(false)
                  // console.log(selectedRowKeys)
                  for (let i of selectedRowKeys)
                    ApplicationContextRQ.addUdo(i, id).then(d => {
                      message.success('添加成功', 0.5)
                      // const ns: string[] = [...names]
                      // ns.push(i)
                      // setNames(ns)
                      setCxtAddId(i)
                    })
                  setSelectedRowKeys([])
                }}
              >
                <Table
                  rowSelection={{
                    type: 'checkbox',
                    onChange: (keys: any[], rows: any[]) => {
                      setSelectedRowKeys(keys)
                    },
                  }}
                  rowKey="udoi"
                  dataSource={devices}
                  columns={generateColumns([
                    // ['创建时间', 'createOn', () => <span>{dayjs().format('YYYY/MM/DD hh:mm:ss')}</span>],
                    [
                      '资源名称',
                      'name',
                      (text: string, record: any, index: number) => (
                        <span>
                          {record.schema.schema.title}/{record.udoi}
                        </span>
                      ),
                    ],
                  ])}
                />
              </Modal>
              {/* <Dropdown
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
              </Dropdown> */}
              {/* <Tooltip overlay="保存">
                <Icon type="icon-store" onClick={updateApplicationContext} />
              </Tooltip> */}
              {/* <Tooltip overlay="消息过滤">
                <Icon type="icon-template" onClick={_ => setOpen(!open)} />
              </Tooltip> */}
            </>
          }
        >
          {viewModes[mode].render({
            names,
            setNames,
            contextId,
            deleteApplication,
            context,
            applicationContext,
            setFilter,
            setSelectedUdoId,
            updateApplicationContext,
          })}
        </Card>
      </Page>
    </>
  )
}
