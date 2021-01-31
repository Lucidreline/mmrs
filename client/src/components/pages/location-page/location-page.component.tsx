import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const LocationPage = () => {
  const [Adventures, setAdventures] = useState([
    { _id: '0', name: '', description: '', date: '' },
  ])

  const urlArr = useLocation().pathname.split('/')
  const locationId = urlArr[urlArr.length - 1]
  useEffect(() => {
    async function fetchAdventures() {
      const responce = await axios.get(
        'http://localhost:3050/api/adventures/by-location?',
        {
          params: {
            locationId: locationId,
          },
        },
      )
      console.log(responce)
      setAdventures(responce.data)
    }
    fetchAdventures()
  }, [locationId])
  return (
    <div>
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
