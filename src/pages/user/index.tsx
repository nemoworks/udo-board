import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, message } from 'antd'
import { Input } from '@material-ui/core'
import dayjs from 'dayjs'
import { Icon, Page } from '@/components'
import { UserRQ } from '@/requests'
import { generateColumns } from '@/utils'

export default function () {
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    UserRQ.getAll().then(setUsers)
  }, [])

  const columns = generateColumns([
    ['创建时间', 'createOn', (text: string) => <a>{dayjs(text).format('YYYY/MM/DD hh:mm:ss')}</a>],
    ['姓名', 'name'],
    ['邮箱', 'email'],
    ['标签', 'tags', (tags: string[]) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)],
    [
      '',
      '',
      (text: string, record: any, index: number) => (
        <>
          <Icon type="icon-edit" onClick={_ => history.push('/user/' + record.id)} />
          <Icon
            type="icon-delete"
            onClick={_ =>
              UserRQ.delete(record.id).then(_ => {
                setUsers(users.filter(u => u.id !== record.id))
                message.success('删除成功', 0.5)
              })
            }
          />
        </>
      ),
      100,
    ],
  ])

  return (
    <Page className="user" title="UDO-Board | 客户管理">
      <Card
        title={
          <>
            <span className="text">客户</span>
            <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
          </>
        }
        extra={
          <>
            <Icon
              type="icon-create"
              onClick={_ =>
                UserRQ.create().then(u => {
                  message.success('创建成功', 0.5)
                  history.push('/user/' + u.id)
                })
              }
            />
          </>
        }
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: (keys: any[], rows: any[]) => {
              setSelectedRowKeys(keys as any)
            },
          }}
          rowKey="id"
          columns={columns}
          dataSource={users}
        />
      </Card>
    </Page>
  )
}
