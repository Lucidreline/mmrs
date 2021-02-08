import axios from 'axios'
import { useEffect, useState } from 'react'
import ThumbnailList from '../../thumbnail-list/thumbnail-list.component'

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
      {Adventures.map(({ _id, name, description, date, pictures }) => (
        <div key={_id}>
          <h1>{name}</h1>
          <span>{date}</span>
          <p>{description}</p>
          <ThumbnailList imageUrls={pictures} firstX={3} />
        </div>
      ))}
    </div>
  )
}

export default AdventuresPage
