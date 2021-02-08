import { useEffect, useState } from 'react'
import axios from 'axios'
import LocationCard from '../../location-card/location-card.component'

const LocationsPage = () => {
  const [Locations, setLocations] = useState([
    { lat: 0, lon: 0, name: '', _id: '', adventures: [] },
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
        <LocationCard key={location._id} location={location} />
      ))}
    </div>
  )
}

export default LocationsPage
