import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdventuresPage = () => {
  const [Adventures, setAdventures] = useState([
    { _id: '0', name: '', description: '', date: '' },
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
      {Adventures.map(({ _id, name, description, date }) => (
        <div key={_id}>
          <h1>{name}</h1>
          <span>{date}</span>
        </div>
      ))}
    </div>
  )
}

export default AdventuresPage
