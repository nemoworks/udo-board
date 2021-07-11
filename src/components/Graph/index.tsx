import { useState, useEffect } from 'react'
import { Chart } from '@antv/g2'
import './index.less'

export default function ({ devices }) {
  useEffect(() => {
    const data = [
      { task: 'task0', startTime: '0000-01-01 01:17:12', endTime: '0000-01-01 01:19:10', status: 0 },
      { task: 'task1', startTime: '0000-01-01 01:18:15', endTime: '0000-01-01 01:19:20', status: 0 },
      { task: 'task2', startTime: '0000-01-01 02:11:32', endTime: '0000-01-01 02:18:50', status: 0 },
      { task: 'task3', startTime: '0000-01-01 02:18:50', endTime: '0000-01-01 03:16:38', status: 0 },
    ]

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
  }, [])

  return <div id="container"></div>
}
