import React from 'react'
import Thumbnail from '../thumbnail/thumbnail.component'

import './thumbnail-preview.styles.scss'

interface IProps {
  imageUrls: string[]
  firstX?: number
}

const ThumbnailPreview = ({ imageUrls, firstX }: IProps) => {
  if (firstX === undefined) firstX = imageUrls.length > 0 ? imageUrls.length : 0
  else if (firstX >= imageUrls.length)
    firstX = firstX = imageUrls.length > 0 ? imageUrls.length : 0

  const cutDownImageList = imageUrls.slice(0, firstX)

  return (
    <div className="thumbnail-container">
      {cutDownImageList.map((imageUrl, index) => (
        <Thumbnail key={index} imageUrl={imageUrl} />
      ))}
    </div>
  )
}

export default ThumbnailPreview
