import React, { Component } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import './map.styles.scss'

export default class Map extends Component {
  render() {
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

          <Marker position={[35.6082212, -118.484579]}>
            <Popup>Tank Park!</Popup>
          </Marker>
        </MapContainer>
      </section>
    )
  }
}
