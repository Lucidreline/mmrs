import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const AdventurePage = () => {
  const [Adventure, setAdventure] = useState({
    _id: '0',
    name: '',
    description: '',
    date: '',
  })

  const urlArr = useLocation().pathname.split('/')
  const adventureId = urlArr[urlArr.length - 1]

  useEffect(() => {
    async function fetchlocation() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/adventures/id`,
        {
          params: {
            adventureId,
          },
        },
      )
      setAdventure(responce.data)
    }
    fetchlocation()
  }, [adventureId])

  return (
    <div className="container">
      <p>{JSON.stringify(Adventure)}</p>
    </div>
  )
}

export default AdventurePage
