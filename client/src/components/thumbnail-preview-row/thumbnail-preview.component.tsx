import React from 'react'
import Thumbnail from '../thumbnail/thumbnail.component'

import './thumbnail-preview.styles.scss'

interface IProps {
  imageUrls: string[]
}

const ThumbnailPreview = ({ imageUrls }: IProps) => {
  return (
    <div className="thumbnail-container">
      {imageUrls.map((imageUrl, index) => (
        <Thumbnail key={index} imageUrl={imageUrl} />
      ))}
    </div>
  )
}

export default ThumbnailPreview
