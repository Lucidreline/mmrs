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

const CardGrid = (props: IProps) => {
  let whatToRender

  if (props.adventures !== undefined) {
    whatToRender = (
      <>
        {props.adventures.map(({ _id, name, pictures, date }: IAdventure) => (
          <Card
            key={_id}
            backgroundImg={pictures.length > 0 ? pictures[0] : null}
            btns={[{ to: `/adventure/${_id}`, msg: 'Details', size: 'md' }]}
            name={name}
            subText={formatDate(date)}
          />
        ))}
      </>
    )
  } else if (props.locations !== undefined) {
    whatToRender = <></>
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
