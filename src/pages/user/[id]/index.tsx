import { useEffect, useState } from 'react'
import { Card, Tooltip, message } from 'antd'
import { Input } from '@material-ui/core'
import { Page, Icon } from '@/components'
import { UserRQ } from '@/requests'

export default function ({
  match: {
    params: { id },
  },
}) {
  const [user, setUser] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function updateUser() {
    UserRQ.update({
      ...user,
      name,
      email,
    }).then(u => {
      message.success('保存成功', 0.5)
      setUser(u)
    })
  }

  useEffect(() => {
    UserRQ.get(id).then(user => {
      const { name, email } = user

      setUser(user)
      setName(name)
      setEmail(email)
    })
  }, [])

  return (
    <Page className="user single" title="UDO-Board | 客户编辑">
      <Card
        title={<Input value={name} onChange={e => setName(e.target.value)} />}
        extra={
          <>
            <Tooltip overlay="保存">
              <Icon type="icon-store" onClick={updateUser} />
            </Tooltip>
          </>
        }
      >
        邮箱 <Input value={email} onChange={e => setEmail(e.target.value)} />
      </Card>
    </Page>
  )
}
