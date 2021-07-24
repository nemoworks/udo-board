import { useState, useEffect } from 'react'
import { Card } from 'antd'
import { Chart } from '@antv/g2'
import './index.less'

export default function () {
  useEffect(() => {
    const data = [
      { province: '江苏', number: 20 },
      { province: '浙江', number: 145 },
      { province: '山东', number: 39 },
      { province: '广东', number: 37 },
      { province: '吉林', number: 24 },
      { province: '黑龙江', number: 38 },
      { province: '北京', number: 38 },
      { province: '上海', number: 33 },
    ]
    const chart = new Chart({
      container: 'humancontainer',
      autoFit: true,
      height: 150,
      width: 100,
    })
    chart.forceFit()

    chart.data(data)
    chart.scale('number', {
      nice: true,
    })
    chart.axis('province', {
      label: {
        rotate: 1,
        offset: 15,
      },
    })

    chart.tooltip({
      showMarkers: false,
    })
    chart.interaction('active-region')

    chart.interval().position('province*number')

    chart.render()
  }, [])

  return (
    <Card className="human-resource-card" title="人力资源">
      <div style={{ width: '90%', margin: '5px' }} id="humancontainer"></div>
    </Card>
  )
}
