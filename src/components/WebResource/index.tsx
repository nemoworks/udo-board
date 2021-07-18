import { Chart } from '@antv/g2'
import { useEffect } from 'react'
import { Card, Divider } from 'antd'
import './index.less'

export default function () {
  useEffect(() => {
    const data = [
      { type: '分类一', value: 20 },
      { type: '分类二', value: 18 },
      { type: '分类三', value: 32 },
      { type: '分类四', value: 15 },
      { type: 'Other', value: 15 },
    ]

    const chart = new Chart({
      container: 'webcontainer',
      autoFit: true,
      height: 110,
      width: 100,
    })
    chart.forceFit()
    chart.data(data)
    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.5,
    })
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    })
    chart.legend(false)
    chart.interval().adjust('stack').position('value').color('type').shape('slice-shape')

    chart.render()
  }, [])

  return (
    // <>
    //     <span className="title">信息资源</span>
    //     <br />
    //     <div id="container" > </div>
    // </>
    <Card title="信息资源">
      <div style={{ height: '90 %', width: '90%' }} id="webcontainer">
        {' '}
      </div>
    </Card>
  )
}
