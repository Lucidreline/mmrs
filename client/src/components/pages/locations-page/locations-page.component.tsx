import { useEffect, useState } from 'react'
import axios from 'axios'
import CardGrid from '../../card-grid/card-grid.component'
import { ILocation } from '../../../utils/types'
import SearchBar from '../../search-bar/search-bar.component'

const LocationsPage = () => {
  const [Locations, setLocations] = useState<ILocation[]>()
  const [SearchField, setSearchField] = useState<string>('')

  useEffect(() => {
    async function fetchlocation() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/locations`,
      )
      setLocations(responce.data.reverse())
    }
    fetchlocation()
  }, [])

  const filteredLocations = Locations?.filter((location) =>
    location.name.toLowerCase().includes(SearchField.toLowerCase().trim()),
  )

  return (
    <div className="container">
      <h2 className="page-title">Locations</h2>
      <SearchBar
        placeholder="Search"
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchField(e.target.value)
        }
      />
      <CardGrid locations={filteredLocations} />
    </div>
  )
}

export default LocationsPage
