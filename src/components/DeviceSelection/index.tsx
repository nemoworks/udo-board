import { useEffect, useState } from 'react'
import { Tag, Table } from 'antd'
import dayjs from 'dayjs'
import { generateColumns } from '@/utils'

export default function DeviceSelection({ exclude, onSelect }) {
  const [devices, setDevices] = useState([
    {
      id: 'D000001',
      name: 'Perish 的手机',
      user: 'U000001',
      createOn: dayjs().format(),
      tags: ['手机'],
      schema: 'S000001',
      content: {
        name: '小米11',
      },
    },
    {
      id: 'D000002',
      name: 'Perish 的手机',
      user: 'U000001',
      createOn: dayjs().format(),
      tags: ['手机'],
      schema: 'S000001',
      content: {
        name: '小米13',
      },
    },
    {
      id: 'D000003',
      name: 'Perish 的手机',
      user: 'U000001',
      createOn: dayjs().format(),
      tags: ['手机'],
      schema: 'S000001',
      content: {
        name: '小米15',
      },
    },
  ])

  useEffect(() => {
    // 获取设备列表的请求
  }, [])

  const columns = generateColumns([
    ['创建时间', 'createOn', () => <span>{dayjs().format('YYYY/MM/DD hh:mm:ss')}</span>],
    ['设备名称', 'name'],
    ['用户', 'user', (id: string = 'user') => (id ? <a href={'/user/' + id}>{id}</a> : <span>未指定</span>)],
    ['标签', 'tags', (tags: string[] = ['tag']) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)],
  ])

  return (
    <div>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: onSelect as any,
        }}
        rowKey="id"
        columns={columns}
        dataSource={devices}
      />
    </div>
  )
}
