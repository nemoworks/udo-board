import { useEffect, useState } from 'react'
import { Card, Tooltip, message, Modal, Button, Drawer, Dropdown, Menu } from 'antd'
import { Input } from '@material-ui/core'
import { Page, Icon, DeviceCard, DeviceSelection, QueryBuilder, DevicesCard } from '@/components'
import { ApplicationContextRQ } from '@/requests'
import './index.less'

const { Item } = Menu

const viewModes = {
  card: {
    name: '卡片',
    // render() {
    //   return <div>卡片</div>
    // },
    render({ devices, setDevices, deleteDeviceById }) {
      return <DevicesCard devices={devices} setDevices={setDevices} deleteDeviceById={deleteDeviceById} />
    },
  },
  graph: {
    name: '通信图',
    render({ devices }) {
      return <div>通信图</div>
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

  function updateApplicationContext() {
    ApplicationContextRQ.update({
      ...applicationContext,
      name,
      devices,
    }).then(u => {
      message.success('保存成功', 0.5)
      setApplicationContext(u)
    })
  }

  function deleteDeviceById(d: string) {
    setDevices(devices.filter(device => device !== d))
  }

  useEffect(() => {
    ApplicationContextRQ.get(id).then(applicationContext => {
      const { name, devices } = applicationContext

      setApplicationContext(applicationContext)
      setName(name)
      setDevices(devices)
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
          </>
        }
      >
        {devices.length != 0 ? viewModes[mode].render({ devices, setDevices, deleteDeviceById }) : null}
      </Card>
    </Page>
  )
}
