import { useState, useEffect } from 'react'
import { Table, Tag, Space } from 'antd'

const columns = [
  {
    title: '实例名称',
    dataIndex: 'name',
  },
  {
    title: '人/机/物',
    dataIndex: 'link',
  },
]
const data = [
  {
    name: 'instance1',
    link: '0/0/1',
  },
  {
    name: 'instance2',
    link: '0/1/1',
  },
  {
    name: 'instance3',
    link: '2/0/1',
  },
  {
    name: 'instance4',
    link: '2/0/1',
  },
  {
    name: 'instance5',
    link: '2/0/1',
  },
  {
    name: 'instance6',
    link: '2/0/1',
  },
  {
    name: 'instance7',
    link: '2/0/1',
  },
  {
    name: 'instance8',
    link: '2/0/1',
  },
  {
    name: 'instance9',
    link: '2/0/1',
  },
  {
    name: 'instance10',
    link: '2/0/1',
  },
  {
    name: 'instance11',
    link: '2/0/1',
  },
]

export default function () {
  return (
    <Table
      style={{ height: '100%', overflow: 'scroll' }}
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
    />
  )
}
