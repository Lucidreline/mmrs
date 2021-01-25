import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import './map.styles.scss'

const Map = () => {
  const [Locations] = useState(() => {
    // fetch data here
    return [
      {
        lat: 33.888,
        lon: -118.309,
        radius: 5000,
        _id: 'whaat',
      },
      {
        lat: 33.988,
        lon: -118.409,
        radius: 10000,
        _id: 'whaat no way',
      },
      {
        lat: 34,
        lon: -118.509,
        radius: 15000,
        _id: 'seriously?',
      },
    ]
  })

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
