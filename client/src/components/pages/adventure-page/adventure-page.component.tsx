import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface IAdventure {
  _id: string
  name: number
  description: string
  date: string
  pictures: string[]
}

const AdventurePage = () => {
  const [Adventure, setAdventure] = useState<IAdventure>()

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
      <p>{Adventure?.date}</p>
      {/* <ThumbnailList imageUrls={Adventure.pictures} /> */}
    </div>
  )
}

export default AdventurePage
