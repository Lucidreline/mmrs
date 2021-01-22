import React, { Component } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import './map.styles.scss'

export default class Map extends Component {
  render() {
    return (
      <section className="map">
        <MapContainer
          center={[34.7, -118.2436849]}
          zoom={8}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=aiqfl4my7zdciGDKZzCLdFNwIg987zlGytgsPgAqbWqFy2maSL5ho678A8qa7hWC"
          />

          <Marker position={[35.6082212, -118.484579]}>
            <Popup>Tank Park!</Popup>
          </Marker>
        </MapContainer>
      </section>
    )
  }
}
