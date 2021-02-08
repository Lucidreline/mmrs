import axios from 'axios'
import { useEffect, useState } from 'react'
import ThumbnailPreview from '../../thumbnail-preview-row/thumbnail-preview.component'

const AdventuresPage = () => {
  const [Adventures, setAdventures] = useState([
    { _id: '0', name: '', description: '', date: '', pictures: [''] },
  ])
  useEffect(() => {
    async function fetchlocation() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/adventures`,
      )
      setAdventures(responce.data)
    }
    fetchlocation()
  }, [])

  return (
    <div>
      {Adventures.map(({ _id, name, description, date, pictures }) => (
        <div key={_id}>
          <h1>{name}</h1>
          <span>{date}</span>
          <p>{description}</p>
          <ThumbnailPreview imageUrls={pictures} firstX={3} />
        </div>
      ))}
    </div>
  )
}

export default AdventuresPage
