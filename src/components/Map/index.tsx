import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl'
import './index.less'

export default function ({ devices }) {
  return (
    <Map style={{ height: '100%' }} center={{ lng: 116.402544, lat: 39.928216 }} zoom="11">
      <Marker position={{ lng: 116.402544, lat: 39.928216 }} />
      <NavigationControl />
    </Map>
  )
}
