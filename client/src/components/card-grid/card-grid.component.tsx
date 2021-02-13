import React from 'react'
import Card from '../card/card.component'

import './card-grid.styles.scss'

interface IProps {
  locations?: ILocation[]
  adventures?: IAdventure[]
}

interface ILocation {
  lat: number
  lon: number
  name: string
  _id: string
  mapImage: string
  adventures: string[]
}

interface IAdventure {
  _id: string
  name: string
  pictures: string[]
  date: string
  [key: string]: any
}

const formatDate = (date: string) => {
  const trimmedString = date.split(' ').slice(1, 4).join(' ')
  return trimmedString
}

const adventureCount = (adventures: string[]) => {
  if (adventures.length > 1) return `${adventures.length} Adventures!`
  else if (adventures.length === 1) return '1 Adventure!'
  else return 'No adventures yet!'
}

const CardGrid = (props: IProps) => {
  let whatToRender

  if (props.adventures !== undefined) {
    whatToRender = (
      <>
        {props.adventures.map(({ _id, name, pictures, date }: IAdventure) => (
          <Card
            key={_id}
            backgroundImg={pictures.length > 0 ? pictures[0] : null}
            name={name}
            subText={formatDate(date)}
            btns={[{ to: `/adventure/${_id}`, msg: 'Details', size: 'md' }]}
          />
        ))}
      </>
    )
  } else if (props.locations !== undefined) {
    whatToRender = (
      <>
        {props.locations.map(
          ({ _id, name, mapImage, adventures, lat, lon }: ILocation) => (
            <Card
              key={_id}
              backgroundImg={mapImage}
              name={name}
              subText={adventureCount(adventures)}
              btns={[
                { to: `/map/goto/${lat},${lon}`, msg: 'Map', size: 'md' },
                { to: `/location/${_id}`, msg: 'Details', size: 'md' },
              ]}
            />
          ),
        )}
      </>
    )
  } else {
    whatToRender = (
      <>
        <p>Card Type is invalid</p>
      </>
    )
  }

  return <div className="card-grid">{whatToRender}</div>
}

export default CardGrid
