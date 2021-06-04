import { useEffect, useState } from 'react'
import { Card, Tooltip, message, Modal, Button } from 'antd'
import { Input } from '@material-ui/core'
import { Page, Icon, DeviceCard, DeviceSelection } from '@/components'
import { ApplicationRQ, DeviceRQ } from '@/requests'
import './index.less'

export default function ({
  match: {
    params: { id },
  },
}) {
  const [application, setApplication] = useState({})
  const [name, setName] = useState('')
  const [devices, setDevices] = useState<any[]>([])
  const [selectedDevices, setSelectedDevices] = useState<any[]>([])

  const [visible, setVisible] = useState(false)

  function updateApplication() {
    ApplicationRQ.update({
      ...application,
      name,
      devices,
    }).then(u => {
      message.success('保存成功', 0.5)
      setApplication(u)
    })
  }

  function deleteDeviceById(d: string) {
    setDevices(devices.filter(device => device !== d))
  }

  useEffect(() => {
    ApplicationRQ.get(id).then(application => {
      const { name, devices } = application

      setApplication(application)
      setName(name)
      setDevices(devices)
    })
  }, [])

  return (
    <Page className="application single" title="UDO-Board | 场景编辑">
      <Card
        className="grid"
        title={<Input value={name} onChange={e => setName(e.target.value)} />}
        extra={
          <>
            <Tooltip overlay="保存">
              <Icon type="icon-store" onClick={updateApplication} />
            </Tooltip>
          </>
        }
      >
        <Modal
          className="application single"
          title={
            <>
              添加设备
              <Button
                type="primary"
                onClick={_ => {
                  setDevices(devices.concat(selectedDevices))
                  setVisible(false)
                }}
              >
                添加
              </Button>
            </>
          }
          visible={visible}
          onCancel={_ => setVisible(false)}
          destroyOnClose={true}
          closable={false}
          footer={null}
          width="100%"
        >
          <DeviceSelection exclude={devices} onSelect={setSelectedDevices} />
        </Modal>
        <Card className="operator" size="small" hoverable={true} onClick={_ => setVisible(true)}>
          <Icon type="icon-create" />
        </Card>
        {devices.map(d => (
          <DeviceCard key={d} deviceId={d} extra={<Icon type="icon-delete" onClick={_ => deleteDeviceById(d)} />} />
        ))}
      </Card>
    </Page>
  )
}
