import { useEffect, useState } from 'react'
import { Card, Tooltip, message, Modal, Button, Drawer } from 'antd'
import { Input } from '@material-ui/core'
import { Page, Icon, DeviceCard, DeviceSelection, QueryBuilder } from '@/components'
import { ApplicationContextRQ } from '@/requests'
import './index.less'

export default function ({
  match: {
    params: { id },
  },
}) {
  const [applicationContext, setApplicationContext] = useState({})
  const [name, setName] = useState('')
  const [devices, setDevices] = useState<any[]>([])
  const [selectedDevices, setSelectedDevices] = useState<any[]>([])

  /**
   * 对话框显示/隐藏状态
   */
  const [visible, setVisible] = useState(false)

  /**
   * 抽屉显示/隐藏状态
   */
  const [open, setOpen] = useState(false)

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
            <Tooltip overlay="保存">
              <Icon type="icon-store" onClick={updateApplicationContext} />
            </Tooltip>
          </>
        }
      >
        <Modal
          className="application_context single"
          title={
            <>
              添加设备
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
                  }}
                />
                <Icon type="icon-delete" onClick={_ => deleteDeviceById(d)} />
              </>
            }
          />
        ))}
        <Drawer visible={open} title="消息过滤规则配置" onClose={_ => setOpen(false)} closeIcon={null} width="50%">
          <QueryBuilder />
        </Drawer>
      </Card>
    </Page>
  )
}
