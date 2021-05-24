import { useState } from 'react'
import { Card, Table, Tag } from 'antd'
import { Input } from '@material-ui/core'
import { Icon } from '@/components'
import './index.less'

const columns = [
  {
    title: '创建时间',
    dataIndex: 'createOn',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '模板名称',
    dataIndex: 'name',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
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
    <div className="page schema container">
      <Card
        title={
          <>
            <span className="text">模板</span>
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
              name: 'Mobile Phone',
              tags: ['Great', 'Cheap'],
            },
          ]}
        />
      </Card>
    </div>
  )
}
