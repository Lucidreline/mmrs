import React from 'react'
import LocationCard from '../location-card/location-card.component'

import './location-card-list.styles.scss'

interface IProps {
  locations: {
    lat: number
    lon: number
    name: string
    _id: string
    adventures: any[]
    mapImage: string
  }[]
}

const LocationCardList = ({ locations }: IProps) => {
  return (
    <div className="location-card-list">
      {locations.map((location, index) => (
        <LocationCard key={index} location={location} />
      ))}
    </div>
  )
}

export default LocationCardList
