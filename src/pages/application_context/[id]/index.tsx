import { useEffect, useState } from 'react'
import { Card, Tooltip, message, Modal, Button, Drawer, Dropdown, Menu } from 'antd'
import { Input } from '@material-ui/core'
import { Page, Icon, DeviceCard, DeviceSelection, QueryBuilder, DevicesCard, Graph } from '@/components'
import { ApplicationContextRQ } from '@/requests'
import './index.less'

const { Item } = Menu

const viewModes = {
  card: {
    name: '卡片',
    // render() {
    //   return <div>卡片</div>
    // },
    render({ applicationContext, setFilter }) {
      return <QueryBuilder device={applicationContext} onQueryChange={setFilter} />
    },
  },
  graph: {
    name: '通信图',
    render({ applicationContext }) {
      return <Graph devices={{}} />
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
      console.log(data)
      setApplicationContext(data)
    }
  }, [filter])

  function updateApplicationContext() {
    ApplicationContextRQ.update(id, applicationContext).then(u => {
      message.success('保存成功', 0.5)
      setApplicationContext(u)
    })
  }

  function deleteDeviceById(d: string) {
    setDevices(devices.filter(device => device !== d))
  }

  useEffect(() => {
    ApplicationContextRQ.get(id).then(applicationContext => {
      setApplicationContext(applicationContext)
    })
  }, [])

  return (
    <Page className="application_context single" title="UDO-Board | 场景编辑">
      <Card
        className="grid"
        title={<Input value={name} onChange={e => setName(e.target.value)} />}
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
            <Tooltip overlay="保存">
              <Icon type="icon-store" onClick={updateApplicationContext} />
            </Tooltip>
            <Tooltip overlay="消息过滤">
              <Icon type="icon-store" onClick={_ => setOpen(!open)} />
            </Tooltip>
          </>
        }
      >
        {viewModes[mode].render({ applicationContext, setFilter })}
      </Card>
    </Page>
  )
}
