import { Chart } from '@antv/g2'
import { useEffect } from 'react'

export default function () {
  useEffect(() => {
    const data = [
      { time: '00:00', usage: 38 },
      { time: '01:00', usage: 52 },
      { time: '02:00', usage: 52 },
      { time: '03:00', usage: 61 },
      { time: '04:00', usage: 61 },
      { time: '05:00', usage: 52 },
      { time: '06:00', usage: 58 },
      { time: '07:00', usage: 38 },
      { time: '08:00', usage: 48 },
      { time: '09:00', usage: 38 },
      { time: '10:00', usage: 38 },
      { time: '11:00', usage: 110 },
      { time: '12:00', usage: 129 },
      { time: '13:00', usage: 100 },
      { time: '14:00', usage: 125 },
      { time: '15:00', usage: 145 },
      { time: '16:00', usage: 130 },
      { time: '17:00', usage: 100 },
      { time: '18:00', usage: 61 },
      { time: '19:00', usage: 52 },
      { time: '20:00', usage: 64 },
      { time: '21:00', usage: 48 },
      { time: '22:00', usage: 48 },
      { time: '23:00', usage: 48 },
      { time: '24:00', usage: 38 },
    ]
    const chart = new Chart({
      container: 'usagecontainer',
      autoFit: true,
      height: 120,
      width: 300,
    })
    chart.forceFit()
    chart.data(data)
    chart.scale('usage', {
      nice: true,
    })

    chart.tooltip({
      showMarkers: false,
    })
    chart.interaction('active-region')

    chart.interval().position('time*usage')

    chart.render()
  }, [])

  return <div style={{ height: '100 %', width: '90%', margin: '20px' }} id="usagecontainer"></div>
}
