import { useState, useEffect } from 'react'
import { Chart } from '@antv/g2'
import './index.less'

export default function ({ context }) {
  const { context: cxt } = context
  // console.log('sadsada', context)
  const [contextKeys, setContextKeys] = useState<string[]>([])
  const [TimeLargerValues, setTimeLargerValues] = useState({})
  const [TimeLessValues, setTimeLessValues] = useState({})
  useEffect(() => {
    const i = cxt[0]
    // console.log(i)
    if (Object.keys(i).length != 0) {
      // console.log('graph', context)
      const { timeLargerValues } = i
      const { timeLessValues } = i
      //console.log(timeLargerValues, timeLessValues)
      const keyNames: string[] = timeLargerValues.map(l => {
        return Object.keys(l)[0]
      })
      // console.log(keyNames)
      setContextKeys(keyNames)
    }
  }, [context])
  useEffect(() => {
    // const data = [
    //   { task: 'task0', startTime: '0000-01-01 01:17:12', endTime: '0000-01-01 01:19:10', status: 0 },
    //   { task: 'task1', startTime: '0000-01-01 01:18:15', endTime: '0000-01-01 01:19:20', status: 0 },
    //   { task: 'task2', startTime: '0000-01-01 02:11:32', endTime: '0000-01-01 02:18:50', status: 0 },
    //   { task: 'task3', startTime: '0000-01-01 02:18:50', endTime: '0000-01-01 03:16:38', status: 0 },
    // ]
    if (contextKeys.length != 0) {
      // console.log(timeLargerValues, timeLessValues)
      const i = cxt[0]
      const { timeLargerValues } = i
      const { timeLessValues } = i
      const data = contextKeys.map(c => {
        let start = ''
        let end = ''
        for (let i of timeLargerValues) {
          //console.log(i)
          if (Object.keys(i)[0] == c) {
            start = i[c]
            break
          }
        }
        for (let i of timeLessValues) {
          //console.log(i)
          if (Object.keys(i)[0] == c) {
            end = i[c]
            break
          }
        }
        return {
          task: c,
          startTime: '0000-01-01 ' + start,
          endTime: '0000-01-01 ' + end,
          status: 0,
        }
      })
      // console.log(data)

      const values = ['允许运行', '禁止运行']

      data.forEach((obj: any) => {
        obj.range = [obj.startTime, obj.endTime]
        obj.status = values[obj.status]
      })

      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500,
      })

      chart.data(data)

      chart.coordinate().transpose().scale(1, -1)

      chart.scale('range', {
        type: 'time',
        mask: 'HH:mm:ss',
        nice: true,
      })

      chart.tooltip({
        showMarkers: false,
      })
      chart.interaction('element-active')
      chart
        .interval()
        .position('task*range')
        .color('status', ['#2FC25B', '#F04864'])
        .animate({
          appear: {
            animation: 'scale-in-x',
          },
        })

      chart.render()
    }
  }, [contextKeys])

  return <div id="container"></div>
}
