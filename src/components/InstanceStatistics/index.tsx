import { useState, useEffect } from 'react'
import { Card, List, Avatar } from 'antd'
import './index.less'

const data = [
  {
    title: '会议安排',
    avatar: require('/src/assets/applications/huiyi.png'),
    number: 2,
  },
  {
    title: '智慧城管',
    avatar: require('/src/assets/applications/chengshi.png'),
    number: 10,
  },
  {
    title: '家装设计',
    avatar: require('/src/assets/applications/jiazhuangsheji.png'),
    number: 1,
  },
  {
    title: '来一杯咖啡',
    avatar: require('/src/assets/applications/kafei.png'),
    number: 0,
  },
  {
    title: '看漫画',
    avatar: require('/src/assets/applications/manhua.png'),
    number: 0,
  },
  {
    title: '智能画室',
    avatar: require('/src/assets/applications/shuhuashi.png'),
    number: 0,
  },
]

function getMax(datas: any[]) {
  let result = 0
  for (let i of datas) {
    const { number } = i
    if (number > result) {
      result = number
    }
  }
  return result
}

export default function () {
  const max = getMax(data)
  return (
    <Card className="instance-statistics-card" title="实例数量统计">
      <List
        className="instance-statistics-list"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size="small" shape="square" src={item.avatar} />}
              description={
                item.number != 0 ? (
                  <button
                    style={{
                      width: (item.number / max) * 140 > 15 ? (item.number / max) * 140 : 15,
                      backgroundColor: 'beige',
                      fontSize: '50%',
                      color: 'blue',
                      textAlign: 'center',
                      padding: '1px',
                      border: 'none',
                    }}
                  >
                    {item.number}
                  </button>
                ) : (
                  item.number
                )
              }
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
