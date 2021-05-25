import { useState } from 'react'
import { Card, Table } from 'antd'
import { Input } from '@material-ui/core'
import { Icon, Page } from '@/components'

const columns = [
  {
    title: '注册时间',
    dataIndex: 'createOn',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '',
    dataIndex: '',
    render: (text: string, record: any, index: number) => (
      <>
        <Icon type="icon-delete" />
      </>
    ),
  },
]

export default function () {
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

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
            <Icon type="icon-create" />
          </>
        }
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: setSelectedRowKeys as any,
          }}
          rowKey="id"
          columns={columns}
          dataSource={[
            {
              id: '000001',
              createOn: '2021',
              name: 'Perish',
              email: 'perishcode@gmail.com',
            },
          ]}
        />
      </Card>
    </Page>
  )
}
