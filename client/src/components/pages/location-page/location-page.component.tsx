import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AdventureCardList from '../../adventure-card-list/adventure-card-list.component'

import './location-page.styles.scss'

export const LocationPage = () => {
  const [Location, setLocation] = useState({ lon: 0, lat: 0, name: '' })

  const [Adventures, setAdventures] = useState([
    { _id: '0', name: '', description: '', date: '', pictures: [''] },
  ])

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
    <div className="container location-page">
      <h2 className="page-title">{Location.name}</h2>
      <span className="coordinates">
        ({Location.lat.toFixed(2)}, {Location.lon.toFixed(2)})
      </span>

      <AdventureCardList adventures={Adventures} />
    </div>
  )
}
