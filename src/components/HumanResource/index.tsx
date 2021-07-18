import { useState, useEffect } from 'react'
import { Card } from 'antd'
import { Chart } from '@antv/g2'

export default function () {
  useEffect(() => {
    const data = [
      { province: '江苏', number: 38 },
      { province: '浙江', number: 52 },
      { province: '山东', number: 61 },
      { province: '广东', number: 145 },
      { province: '吉林', number: 48 },
      { province: '黑龙江', number: 38 },
      { province: '北京', number: 38 },
      { province: '上海', number: 38 },
    ]
    const chart = new Chart({
      container: 'humancontainer',
      autoFit: true,
      height: 110,
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
    <Card title="人力资源">
      <div style={{ width: '100%', height: '100%', padding: '10px' }} id="humancontainer"></div>
    </Card>
  )
}
