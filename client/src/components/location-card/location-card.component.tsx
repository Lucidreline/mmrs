import React from 'react'
import { useHistory } from 'react-router-dom'
import Btn from '../btn/btn.component'

import './location-card.styles.scss'

interface IProps {
  location: {
    lat: number
    lon: number
    name: string
    _id: string
    mapImage: string
    adventures: any[]
  }
}

const LocationCard = ({ location }: IProps) => {
  const { lat, lon, name, _id, adventures, mapImage } = location

  const history = useHistory()

  const mapBtnClicked = () => history.push(`/map/${lat},${lon}`)

  const detailsBtnClicked = () => history.push(`/location/${_id}`)

  const backgroundMap = {
    backgroundImage: `url(${mapImage})`,
  }

  let adventureText = ''

  if (adventures.length > 1) adventureText = `${adventures.length} Adventures!`
  else if (adventures.length === 1) adventureText = '1 Adventure!'
  else adventureText = 'No adventures yet!'

  return (
    <div className="location-card">
      <div className="map-image" style={backgroundMap}></div>
      <h3 className="location-name">{name}</h3>
      <span className="adventureCount">{adventureText} </span>
      <div className="btn-container">
        <Btn size="md" onClick={mapBtnClicked}>
          Map
        </Btn>
        <Btn size="md" onClick={detailsBtnClicked}>
          Details
        </Btn>
      </div>
    </div>
  )
}

export default LocationCard
