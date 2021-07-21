import { useState, useEffect } from 'react'
import { Table, Tag, Space } from 'antd'
import './index.less'

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
    name: 'office-jkssgyc',
    link: '2/0/2',
  },
  {
    name: 'office-p383jsl',
    link: '1/1/1',
  },
  {
    name: 'city-bx21bdjk',
    link: '3/0/3',
  },
  {
    name: 'city-a812jkm',
    link: '2/1/5',
  },
  {
    name: 'city-gms23bizq',
    link: '5/0/8',
  },
  {
    name: 'coffee-p213nda',
    link: '2/0/1',
  },
  {
    name: 'coffee-b8sabd2k',
    link: '3/2/8',
  },
  {
    name: 'book-i2haa29x',
    link: '4/0/1',
  },
]

export default function ({}) {
  return (
    <Table
      className="instance-table"
      bordered={true}
      columns={columns}
      dataSource={data}
      pagination={false}
      onRow={record => {
        return {
          onClick: event => {
            console.log(record)
          }, // 点击行
        }
      }}
    />
  )
}
