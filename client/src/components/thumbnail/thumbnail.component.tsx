import React from 'react'

import './thumbnail.styles.scss'

interface IProps {
  imageUrl: string
}

const Thumbnail = ({ imageUrl }: IProps) => {
  const style = {
    backgroundImage: `url(${imageUrl})`,
  }
  return <div style={style} className="thumbnail "></div>
}

export default Thumbnail
