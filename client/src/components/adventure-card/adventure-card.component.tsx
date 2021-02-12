import React from 'react'
import { useHistory } from 'react-router-dom'
import Btn from '../btn/btn.component'
import { IAdventure } from '../adventure-card-list/adventure-card-list.component'

import './adventure-card.styles.scss'

interface IProps {
  adventure: IAdventure
}

const AdventureCard = ({ adventure }: IProps) => {
  const { _id, name, pictures, date } = adventure
  const history = useHistory()
  const adventurePageBtnClicked = () => history.push(`/adventure/${_id}`)

  let picToUse: string,
    nameToUse: string,
    defaultImage =
      'https://res.cloudinary.com/cheese-itz/image/upload/q_10/v1613127950/mmrs/defaults/8757-road_-green-trees_-forest-free-hq-image_z0tyd1.png'

  nameToUse = name.length > 0 ? name : 'Cool Adventure!'
  picToUse = pictures.length > 0 ? pictures[0] : defaultImage

  const formattedDate = (): string => {
    const adventureDate = new Date(parseInt(date)).toString()
    const trimmedString = adventureDate.split(' ').slice(1, 4).join(' ')
    return trimmedString
  }

  const backgroundImage = {
    backgroundImage: `url(${picToUse})`,
  }

  return (
    <div className="adventure-card">
      <div
        className={`adventure-image ${
          picToUse === defaultImage ? 'default' : null
        }`}
        style={backgroundImage}
      ></div>
      <h3 className="adventure-name">{nameToUse}</h3>
      <span className="date">{formattedDate()} </span>
      <div className="btn-container">
        <Btn size="md" onClick={adventurePageBtnClicked}>
          Details
        </Btn>
      </div>
    </div>
  )
}

export default AdventureCard
