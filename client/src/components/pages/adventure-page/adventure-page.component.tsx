import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ThumbnailList from '../../thumbnail-list/thumbnail-list.component'

import './adventurePage.styles.scss'

interface IAdventure {
  _id: string
  name: string
  description: string
  date: string
  pictures: string[]
}



const AdventurePage = () => {
  const [Adventure, setAdventure] = useState<IAdventure>({
    name: 'hi',
    pictures: [''],
    date: '',
    description: '',
    _id: ''
  })

  

  const urlArr = useLocation().pathname.split('/')
  const adventureId = urlArr[urlArr.length - 1]
 
  useEffect(() => {
    async function fetchAdventure() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/adventures/id`,
        {
          params: {
            adventureId,
          },
        },
      )
      setAdventure(await responce.data.adventure)
    }
    fetchAdventure()
  }, [adventureId])

const formattedDate = (): string => {
    const adventureDate = new Date(parseInt(Adventure.date)).toString()
    const trimmedString = adventureDate.split(' ').slice(1, 4).join(' ')
    return trimmedString
  }

 return(
  <div className="container adventure-page">
      <h2 className="page-title">{Adventure.name}</h2>
      <p className='description'>{Adventure.description}</p>
      <span className='date'>{formattedDate()}</span>
      
      <ThumbnailList imageUrls={Adventure.pictures}/>
    </div>
 )
}

export default AdventurePage
