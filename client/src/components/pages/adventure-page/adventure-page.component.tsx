import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatDateFromString } from '../../../utils/functions'
import { IAdventure, ILocation } from '../../../utils/types'
import Header from '../../header/header.component'
import ThumbnailList from '../../thumbnail-list/thumbnail-list.component'

import './adventurePage.styles.scss'

interface IResponce {
  data: {
    adventure: IAdventure
    location: ILocation
  }
  [key: string]: any
}

const AdventurePage = () => {
  const [Adventure, setAdventure] = useState<IAdventure>()
  const [Location, setLocation] = useState<ILocation>()

  const urlArr = useLocation().pathname.split('/')
  const adventureId = urlArr[urlArr.length - 1]

  useEffect(() => {
    async function fetchAdventure() {
      const responce: IResponce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/adventures/id`,
        {
          params: {
            adventureId,
            includeLocation: true,
          },
        },
      )
      setAdventure(responce.data.adventure)
      setLocation(responce.data.location)
    }
    fetchAdventure()
  }, [adventureId])

  return (
    <>
      <Header />
      <div className="container adventure-page">
        <h2 className="page-title">{Adventure?.name}</h2>
        <p className="description">{Adventure?.description}</p>
        <Link to={`/location/${Location?._id}`}>
          <span className="location-link">{Location?.name}</span>
        </Link>
        <span className="date">{formatDateFromString(Adventure?.date)}</span>

        <ThumbnailList
          imageUrls={Adventure !== undefined ? Adventure.pictures : []}
        />
      </div>
    </>
  )
}

export default AdventurePage
