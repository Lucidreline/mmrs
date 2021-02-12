import axios from 'axios'
import { useEffect, useState } from 'react'
import AdventureCardList from '../../adventure-card-list/adventure-card-list.component'

const AdventuresPage = () => {
  const [Adventures, setAdventures] = useState([
    { _id: '0', name: '', description: '', date: '', pictures: [''] },
  ])
  useEffect(() => {
    async function fetchlocation() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/adventures`,
      )
      setAdventures(responce.data.reverse())
    }
    fetchlocation()
  }, [])

  return (
    <div className="container">
      <AdventureCardList adventures={Adventures} />
    </div>
  )
}

export default AdventuresPage
