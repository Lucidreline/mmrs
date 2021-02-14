import { useEffect, useState } from 'react'
import axios from 'axios'
import CardGrid from '../../card-grid/card-grid.component'
import { ILocation } from '../../../utils/types'

const LocationsPage = () => {
  const [Locations, setLocations] = useState<ILocation[]>()

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
      <CardGrid locations={Locations} />
    </div>
  )
}

export default LocationsPage
