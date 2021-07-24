import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Card, Table, Tag, message, Modal } from 'antd'
import { Input } from '@material-ui/core'
import dayjs from 'dayjs'
import { Icon, Page } from '@/components'
import { ApplicationContextRQ } from '@/requests'
import { generateColumns } from '@/utils'
import { Button, Avatar } from 'antd'

const data = [
  {
    id: 1,
    title: '会议安排',
    avatar: require('/src/assets/applications/huiyi.png'),
    description: '0.2.1',
    diagram: require('/src/assets/diagrams/huiyi.png'),
  },
  {
    id: 2,
    title: '智慧城管',
    avatar: require('/src/assets/applications/chengshi.png'),
    description: '1.2.11',
    diagram: require('/src/assets/diagrams/chengshi.png'),
  },
  {
    id: 3,
    title: '家装设计',
    avatar: require('/src/assets/applications/jiazhuangsheji.png'),
    description: '3.0.8',
  },
  {
    id: 4,
    title: '来一杯咖啡',
    avatar: require('/src/assets/applications/kafei.png'),
    description: '8.6.0',
  },
  {
    id: 5,
    title: '看漫画',
    avatar: require('/src/assets/applications/manhua.png'),
    description: '5.0.3',
  },
  {
    id: 6,
    title: '智能画室',
    avatar: require('/src/assets/applications/shuhuashi.png'),
    description: '3.0.8',
  },
]

export default function () {
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [applicationContexts, setApplicationContexts] = useState<any[]>([])
  const [visible, setVisible] = useState(false)
  const [contextName, setContextName] = useState('')

  useEffect(() => {
    ApplicationContextRQ.getAll().then(setApplicationContexts)
  }, [])
  //console.log('applicationContexts', applicationContexts)
  const modalColumns = [
    {
      title: '应用名称',
      dataIndex: 'title',
      render: (text: string, record: any, index: number) => (
        <>
          <Avatar src={record.avatar} shape="square" size="small" style={{ marginRight: '10px' }} />
          <span>{text}</span>
        </>
      ),
    },
    {
      title: '',
      dataIndex: '',
      render: (text: string, record: any, index: number) => (
        <Button
          size="small"
          type="primary"
          onClick={() => {
            const APName = record.title + '-' + Math.random().toString(16).substr(2, 8)
            // const APName = record.title + '-0e0a1ff5'
            setVisible(false)
            ApplicationContextRQ.create(APName).then(u => {
              message.success('创建成功', 0.5)
              history.push('/application_context/' + u)
            })
          }}
        >
          创建
        </Button>
      ),
    },
  ]

  const columns = generateColumns([
    ['创建时间', 'createOn', (text: string) => <a>{dayjs(text).format('YYYY/MM/DD hh:mm:ss')}</a>],
    ['场景名称', 'name', (text: string, record: any, index: number) => <span>{record.id}</span>],
    ['标签', 'tags', (tags: string[] = []) => tags.map(tag => <Tag key={tag}>{tag}</Tag>)],
    [
      '',
      '',
      (text: string, record: any, index: number) => (
        <>
          <Icon type="icon-edit" onClick={_ => history.push('/application_context/' + record.id)} />
          <Icon
            type="icon-delete"
            onClick={_ =>
              ApplicationContextRQ.delete(record.id).then(_ => {
                setApplicationContexts(applicationContexts.filter(u => u.id !== record.id))
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
    <Page className="application_context" title="UDO-Board | 应用实例管理">
      <Card
        title={
          <>
            <span className="text">应用实例</span>
          </>
        }
        extra={
          <>
            <Modal
              visible={visible}
              footer={null}
              onCancel={_ => setVisible(false)}

              // onOk={_ => {
              //   setVisible(false)

              //   // ApplicationContextRQ.create(contextName).then(u => {
              //   //   message.success('创建成功', 0.5)
              //   //   history.push('/application_context/' + u)
              //   // })
              // }}
            >
              <Table style={{ marginTop: '20px' }} size="small" rowKey="id" columns={modalColumns} dataSource={data} />
            </Modal>
            <Icon type="icon-create" onClick={_ => setVisible(true)} />
          </>
        }
      >
        <Table
          style={{ marginTop: '10px' }}
          rowSelection={{
            type: 'checkbox',
            onChange: setSelectedRowKeys as any,
          }}
          rowKey="id"
          columns={columns}
          dataSource={applicationContexts}
        />
      </Card>
    </Page>
  )
}
