import { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import './index.less'
import WebResource from '../WebResource'
import DeviceResource from '../DeviceResource'
import HumanResource from '../HumanResource'
import ResourceCharts from '../ResourceCharts'
import ApplicationList from '../ApplicationList'
import Instance from '../Instance'
import InstanceStatistics from '../InstanceStatistics'

export default function ({ devices, displayDiagram }) {
  return (
    // <div style={{ width: '100%', height: '100%' }}>
    //     <Row className="row">
    //         <Col style={{ height: '100%' }} span={8}><ApplicationList /></Col>
    //         <Col style={{ height: '100%' }} span={8}><Instance /></Col>
    //         <Col style={{ height: '100%' }} span={8}><InstanceStatistics /></Col>
    //     </Row>
    //     <Row className="row">
    //         <Col style={{ height: '100%' }} span={24}><ResourceCharts /></Col>
    //     </Row>
    //     <Row className="row">
    //         <Col style={{ height: '100%' }} span={8}><WebResource /></Col>
    //         <Col style={{ height: '100%' }} span={8}><DeviceResource /></Col>
    //         <Col style={{ height: '100%' }} span={8}><HumanResource /></Col>
    //     </Row>
    // </div>
    <div style={{ width: '100%', height: '100%' }}>
      <Row className="row">
        <Col style={{ height: '100%' }} span={7}>
          <ApplicationList displayDiagram={displayDiagram} />
        </Col>
        <Col style={{ height: '100%' }} span={7}>
          <InstanceStatistics />
        </Col>
        <Col style={{ height: '100%' }} span={10}>
          <Instance />
        </Col>
      </Row>
      <Row className="row">
        <Col style={{ height: '100%' }} span={24}>
          <ResourceCharts />
        </Col>
      </Row>
      <Row className="row">
        <Col style={{ height: '100%' }} span={8}>
          <WebResource />
        </Col>
        <Col style={{ height: '100%' }} span={8}>
          <DeviceResource />
        </Col>
        <Col style={{ height: '100%' }} span={8}>
          <HumanResource />
        </Col>
      </Row>
    </div>
  )
}
