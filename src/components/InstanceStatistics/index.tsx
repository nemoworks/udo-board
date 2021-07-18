import { useState, useEffect } from 'react'
import { Card, List, Avatar } from 'antd'

const data = [
  {
    title: '应用 1',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    number: 1,
  },
  {
    title: '应用 2',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    number: 2,
  },
  {
    title: '应用 3',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    number: 10,
  },
  {
    title: '应用 4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    number: 1,
  },
  {
    title: '应用 5',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
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
  console.log(max)
  return (
    <Card title="实例数量统计">
      <List
        size="small"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              description={
                item.number != 0 ? (
                  <button
                    style={{
                      width: (item.number / max) * 150 > 15 ? (item.number / max) * 150 : 15,
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
