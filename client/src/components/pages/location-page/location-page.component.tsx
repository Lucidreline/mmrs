import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CardGrid from '../../card-grid/card-grid.component'
import { IAdventure, ILocation } from '../../../utils/types'

import './location-page.styles.scss'
import Header from '../../header/header.component'

export const LocationPage = () => {
  const [Location, setLocation] = useState<ILocation>()

  const [Adventures, setAdventures] = useState<IAdventure[]>()

  const urlArr = useLocation().pathname.split('/')
  const locationId = urlArr[urlArr.length - 1]
  useEffect(() => {
    async function fetchlocation() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/locations/id-and-adventures`,
        {
          params: {
            locationId: locationId,
          },
        },
      )
      setAdventures(responce.data.adventures)
      setLocation(responce.data.location)
    }
    fetchlocation()
  }, [locationId])
  return (
    <>
      <Header />
      <div className="container location-page">
        <h2 className="page-title">{Location?.name}</h2>
        <span className="coordinates">
          ({Location?.lat.toFixed(2)}, {Location?.lon.toFixed(2)})
        </span>

        <CardGrid adventures={Adventures} />
      </div>
    </>
  )
}
