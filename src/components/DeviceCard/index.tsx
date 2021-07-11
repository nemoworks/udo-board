import { useState, useEffect } from 'react'
import { Card, Tag, Divider, Dropdown, Menu, Button, Input } from 'antd'
import { Icon } from '@/components'

const { Item } = Menu

const constraintTypes = {
  startWithPrefix: '指定前缀',
  endWithSuffix: '指定后缀',
  containsKeyword: '包含关键字',
  matchRe: '正则匹配',
}

export default function ({ id, extra }) {
  const [device, setDevice] = useState({
    name: '资源A',
    tags: ['标签1', '标签2'],
  })

  useEffect(() => {
    // 添加 DeviceRQ
  }, [])

  const { name, tags } = device

  return (
    <Card className="deviceCard" title={name} size="small" extra={extra}>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
      {/* {expanded && (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              {Object.keys(constraintTypes).map(key => (
                <Item
                  key={key}
                  onClick={_ =>
                    onChange({
                      ...deviceConfig,
                      constraints: constraints.concat([
                        {
                          type: key,
                          value: '',
                        },
                      ]),
                    })
                  }
                >
                  {constraintTypes[key]}
                </Item>
              ))}
            </Menu>
          }
        >
          <Divider>消息过滤器</Divider>
        </Dropdown>
      )}
      {expanded && (
        <div className="constraints">
          {constraints.map((c: any, index: number) => (
            <div className="item" key={index}>
              <span className="title">{constraintTypes[c.type]}</span>
              <Input
                bordered={false}
                value={c.value}
                onChange={e =>
                  onChange({
                    ...deviceConfig,
                    constraints: constraints.map((constraint, i) =>
                      i === index
                        ? {
                            type: constraint.type,
                            value: e.target.value,
                          }
                        : constraint
                    ),
                  })
                }
              />
              <Icon
                type="icon-delete"
                onClick={_ =>
                  onChange({
                    ...deviceConfig,
                    constraints: constraints.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      )} */}
    </Card>
  )
}
