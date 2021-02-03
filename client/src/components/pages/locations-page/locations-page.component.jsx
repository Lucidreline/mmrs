import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LocationsPage = () => {
  const [Locations, setLocations] = useState([
    { lat: 0, lon: 0, name: '', _id: '' },
  ])
  useEffect(() => {
    async function fetchlocation() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/locations`,
      )
      setLocations(responce.data)
    }
    fetchlocation()
  }, [])
  return (
    <div>
      {Locations.map((location) => (
        <div key={Locations._id} className="">
          <h3>{location.name}</h3>
          <span>
            Add some pictures from the adventures here, like the first 4 or so
          </span>
          <p>
            <Link to={`/location/${location._id}`}>More Details</Link>
          </p>
        </div>
      ))}
    </div>
  )
}

export default LocationsPage
