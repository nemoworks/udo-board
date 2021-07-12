import { useEffect, useState } from 'react'
import { Card, Modal, Button, Drawer } from 'antd'
import { Icon, DeviceCard, DeviceSelection, QueryBuilder } from '@/components'

export default function ({ devices, setDevices, deleteDeviceById }) {
  const [selectedDevices, setSelectedDevices] = useState<any[]>([])
  const [visible, setVisible] = useState(false)

  const [editingDevice, setEditingDevice] = useState<any>({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // setDevices(devices.map(d => (d.id == editingDevice.id ? editingDevice : d)))
    if (Object.keys(editingDevice).length != 0) {
      //console.log(editingDevice)
      const {
        query: { rules },
      } = editingDevice
      //console.log(rules)
    }
  }, [editingDevice])
  //return <QueryBuilder device={editingDevice} onQueryChange={setEditingDevice} />
  return (
    <>
      <Modal
        className="application_context single"
        title={
          <>
            添加资源
            <Button
              type="primary"
              onClick={_ => {
                setDevices(devices.concat(selectedDevices.map(id => ({ id, constraints: [] }))))
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
        <DeviceCard
          key={d.id}
          id={d.id}
          extra={
            <>
              <Icon
                type="icon-filter"
                onClick={_ => {
                  setOpen(true)
                  setEditingDevice(d)
                }}
              />
              <Icon type="icon-delete" onClick={_ => deleteDeviceById(d)} />
            </>
          }
        />
      ))}
      <Drawer visible={open} title="消息过滤规则配置" onClose={_ => setOpen(false)} closeIcon={null} width="50%">
        {editingDevice && <QueryBuilder device={editingDevice} onQueryChange={setEditingDevice} />}
      </Drawer>
    </>
  )
}
