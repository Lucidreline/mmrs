import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'
import axios from 'axios'

import './map.styles.scss'
import { IPinPoint } from '../../utils/types'

const Map = () => {
  const [Locations, setLocation] = useState([
    { _id: '22', lon: 34.8, lat: -118.3, radius: 100000 },
  ])

  const [PinPoints, setPinPoints] = useState<IPinPoint[]>([
    { lat: 0, lon: 0, msg: '' },
  ])

  const urlArr = useLocation().pathname.split('/')

  const [MapCenter] = useState((): [number, number] => {
    if (urlArr.includes('goto') && urlArr.length > 3) {
      const coordinates = urlArr[3].split(',')
      return [parseFloat(coordinates[0]), parseFloat(coordinates[1])]
    } else if (
      process.env.REACT_APP_DEFAULT_LAT !== undefined &&
      process.env.REACT_APP_DEFAULT_LON !== undefined
    ) {
      return [
        parseFloat(process.env.REACT_APP_DEFAULT_LAT),
        parseFloat(process.env.REACT_APP_DEFAULT_LON),
      ]
    } else {
      return [34.8, -118.2436849]
    }
  })

  useEffect(() => {
    async function fetchLocations() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/locations`,
      )
      setLocation(responce.data)
    }

    async function fetchPinPoints() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/pin-points`,
      )
      setPinPoints(responce.data)
    }
    fetchPinPoints()
    fetchLocations()
  }, [])

  const history = useHistory()

  const Events = () => {
    useMapEvents({
      dblclick(e) {
        history.push(
          `/adventure-form/coordinates/${e.latlng.lat},${e.latlng.lng}`,
        )
      },
    })

    return null
  }

  return (
    <section className="map">
      <MapContainer center={MapCenter} zoom={8} scrollWheelZoom={true}>
        {/* watercolor map */}
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"
        />

        {/* street labels */}
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
        />

        {PinPoints.map(({ lat, lon, msg }) => (
          <Marker position={[lat, lon]}>
            <Popup>{msg}</Popup>
          </Marker>
        ))}

        {Locations.map(({ _id, lat, lon, radius }) => (
          <Circle
            key={_id}
            center={[lat, lon]}
            radius={radius}
            color=" #56a6e2"
            fillColor="#6bc0ea"
            fillOpacity={0.4}
          />
        ))}
        <Events />
      </MapContainer>
    </section>
  )
}

export default Map
