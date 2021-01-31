import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import axios from 'axios'

import './map.styles.scss'

const Map = () => {
  const [Locations, setLocation] = useState([
    { _id: '22', lon: 34.8, lat: -118.3, radius: 100000 },
  ])

  useEffect(() => {
    async function fetchLocations() {
      const responce = await axios.get('http://localhost:3050/api/locations')
      setLocation(responce.data)
    }

    fetchLocations()
  }, [])

  const history = useHistory()

  return (
    <section className="map">
      <MapContainer
        center={[34.8, -118.2436849]}
        zoom={8}
        scrollWheelZoom={true}
      >
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

        <Marker position={[35.365055, -117.983115]}>
          <Popup>Our First Kiss</Popup>
        </Marker>

        {Locations.map((location) => (
          <Circle
            key={location._id}
            center={[location.lat, location.lon]}
            radius={location.radius}
            color="#17c0eb"
            fillColor="#18dcff"
            fillOpacity={0.4}
            eventHandlers={{
              click: () => {
                history.push(`/location/${location._id}`)
              },
            }}
          />
        ))}
      </MapContainer>
    </section>
  )
}

export default Map
