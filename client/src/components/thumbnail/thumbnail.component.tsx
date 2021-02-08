import React from 'react'

import './thumbnail.styles.scss'

interface IProps {
  imageUrl: string
  link?: string
}

const Thumbnail = ({ imageUrl, link }: IProps) => {
  const style = {
    backgroundImage: `url(${imageUrl})`,
  }
  return <div style={style} className="thumbnail"></div>
}

export default Thumbnail
