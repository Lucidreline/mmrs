import React from 'react'
import { useHistory } from 'react-router-dom'

import Btn from '../btn/btn.component'

import './card.syles.scss'

interface IProps {
  backgroundImg: string | null
  name: string
  subText: string
  btns: IBtn[]
}

interface IBtn {
  msg: string
  to: string // the link that the button takes you to
  size: string
}

const Card = ({ backgroundImg, name, subText, btns }: IProps) => {
  const history = useHistory()

  const defaultImg =
    'https://res.cloudinary.com/cheese-itz/image/upload/q_10/v1613127950/mmrs/defaults/8757-road_-green-trees_-forest-free-hq-image_z0tyd1.png'
  if (backgroundImg == null) backgroundImg = defaultImg

  name = name.length > 0 ? name : 'Not Named Yet!'
  name = name.length > 36 ? name.substring(0, 36) + '...' : name

  const style = {
    backgroundImage: `url(${backgroundImg})`,
  }

  return (
    <div className="card">
      <div
        className={`background-img ${
          backgroundImg === defaultImg ? 'default-img' : null
        }`}
        style={style}
      ></div>
      <h3 className="name">{name}</h3>
      <span className="sub-text">{subText}</span>
      <div className="btn-container">
        {btns.map(({ msg, to, size }: IBtn, index) => (
          <Btn key={index} size={size} onClick={() => history.push(to)}>
            {msg}
          </Btn>
        ))}
      </div>
    </div>
  )
}

export default Card
