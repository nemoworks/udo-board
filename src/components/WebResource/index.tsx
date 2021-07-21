import { Chart } from '@antv/g2'
import { useEffect } from 'react'
import { Card, Divider } from 'antd'
import './index.less'

// export default function () {
//   useEffect(() => {
//     const data = [
//       { item: '事例一', count: 40, percent: 0.4 },
//       { item: '事例二', count: 21, percent: 0.21 },
//       { item: '事例三', count: 17, percent: 0.17 },
//       { item: '事例四', count: 13, percent: 0.13 },
//       { item: '事例五', count: 9, percent: 0.09 },
//     ];
//     const chart = new Chart({
//       container: 'webcontainer',
//       autoFit: true,
//       height: 110,
//       width: 100,
//     });
//     chart.legend(false)
//     chart.data(data);
//     chart.scale('percent', {
//       formatter: (val) => {
//         val = val * 100 + '%';
//         return val;
//       },
//     });
//     chart.coordinate('theta', {
//       radius: 0.75,
//       innerRadius: 0.6,
//     });
//     chart.tooltip({
//       showTitle: false,
//       showMarkers: false,
//       itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
//     });
//     // 辅助文本
//     chart
//       .annotation()
//       .text({
//         position: ['50%', '50%'],
//         content: '主机',
//         style: {
//           fontSize: 10,
//           fill: '#8c8c8c',
//           textAlign: 'center',
//         },
//         offsetY: -20,
//       })
//       .text({
//         position: ['50%', '50%'],
//         content: '200',
//         style: {
//           fontSize: 10,
//           fill: '#8c8c8c',
//           textAlign: 'center',
//         },
//         offsetX: -10,
//         offsetY: 20,
//       })
//       .text({
//         position: ['50%', '50%'],
//         content: '台',
//         style: {
//           fontSize: 10,
//           fill: '#8c8c8c',
//           textAlign: 'center',
//         },
//         offsetY: 20,
//         offsetX: 20,
//       });
//     chart
//       .interval()
//       .adjust('stack')
//       .position('percent')
//       .color('item')
//       .label('percent', (percent) => {
//         return {
//           content: (data) => {
//             return `${data.item}: ${percent * 100}%`;
//           },
//         };
//       })
//       .tooltip('item*percent', (item, percent) => {
//         percent = percent * 100 + '%';
//         return {
//           name: item,
//           value: percent,
//         };
//       });

//     chart.interaction('element-active');

//     chart.render();
//   }, [])

//   return (
//     // <>
//     //     <span className="title">信息资源</span>
//     //     <br />
//     //     <div id="container" > </div>
//     // </>
//     <Card title="信息资源">
//       <div style={{ height: '90 %', width: '90%' }} id="webcontainer">
//       </div>
//     </Card>
//   )
// }

export default function () {
  useEffect(() => {
    const data = [
      { type: '网络服务', value: 20 },
      { type: '节点', value: 53 },
      { type: '应用接口', value: 18 },
    ]

    const chart = new Chart({
      container: 'webcontainer',
      autoFit: true,
      height: 140,
      width: 50,
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
    chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('type')
      .label('value', value => {
        return {
          content: data => {
            return `${data.type}: ${value}`
          },
        }
      })
      .shape('slice-shape')

    chart.render()
  }, [])

  return (
    // <>
    //     <span className="title">信息资源</span>
    //     <br />
    //     <div id="container" > </div>
    // </>
    <Card title="信息资源" className="web-resource-card">
      <div id="webcontainer"></div>
    </Card>
  )
}
