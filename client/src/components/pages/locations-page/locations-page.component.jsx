import { useEffect, useState } from 'react'
import axios from 'axios'
import LocationCardList from '../../location-card-list/location-card-list.component'

const LocationsPage = () => {
  const [Locations, setLocations] = useState([
    { lat: 0, lon: 0, name: '', _id: '', adventures: [], mapImage: '' },
  ])
  useEffect(() => {
    async function fetchlocation() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/locations`,
      )
      setLocations(responce.data.reverse())
    }
    fetchlocation()
  }, [])
  return (
    <div className="container">
      <LocationCardList locations={Locations} />
    </div>
  )
}

export default LocationsPage
