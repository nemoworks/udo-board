import { useEffect, useState } from 'react'
import { Card, Tooltip, message } from 'antd'
import { Input } from '@material-ui/core'
import { Page, Icon } from '@/components'
import { ApplicationRQ } from '@/requests'

export default function ({
  match: {
    params: { id },
  },
}) {
  const [application, setApplication] = useState({})
  const [name, setName] = useState('')
  const [devices, setDevices] = useState<any[]>([])

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
        title={<Input value={name} onChange={e => setName(e.target.value)} />}
        extra={
          <>
            <Tooltip overlay="保存">
              <Icon type="icon-store" onClick={updateApplication} />
            </Tooltip>
          </>
        }
      >
        {devices.map(d => (
          <div key={d}>{d}</div>
        ))}
      </Card>
    </Page>
  )
}
