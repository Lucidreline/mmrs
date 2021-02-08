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
    adventures: any[]
  }
}

const LocationCard = ({ location }: IProps) => {
  const { lat, lon, name, _id, adventures } = location

  const history = useHistory()

  const mapBtnClicked = () => history.push(`/map/${lat},${lon}`)

  const detailsBtnClicked = () => history.push(`/location/${_id}`)

  const backgroundMap = {
    backgroundImage: `url(https://cdn.theatlantic.com/thumbor/tyKMqzswZRAU4DndlY4mJeA0P0M=/0x82:1000x603/960x500/media/old_wire/img/upload/2013/03/18/happydog/original.jpg)`,
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
        <Btn onClick={mapBtnClicked}>Map</Btn>
        <Btn onClick={detailsBtnClicked}>Details</Btn>
      </div>
    </div>
  )
}

export default LocationCard
