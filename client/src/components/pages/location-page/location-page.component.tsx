import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const LocationPage = () => {
  const [Location, setLocation] = useState({ lon: 0, lat: 0, name: '' })

  const [Adventures, setAdventures] = useState([
    { _id: '0', name: '', description: '', date: '' },
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
    <div className="container">
      <h1>{Location.name}</h1>
      <span>
        ({Location.lat}, {Location.lon})
      </span>
      {Adventures.map(({ _id, name, description, date }) => (
        <div key={_id}>
          <h1>{name}</h1>
          <p>{description}</p>
          <p>{date}</p>
        </div>
      ))}
    </div>
  )
}
