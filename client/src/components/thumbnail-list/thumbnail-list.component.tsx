import React from 'react'
import Thumbnail from '../thumbnail/thumbnail.component'

import './thumbnail-list.styles.scss'

interface IProps {
  imageUrls: string[]
}

const ThumbnailList = ({ imageUrls }: IProps) => {
  return (
    <div className="thumbnail-container above-content-margin">
      {imageUrls.map((imageUrl, index) => (
        <Thumbnail key={index} imageUrl={imageUrl} />
      ))}
    </div>
  )
}

export default ThumbnailList
