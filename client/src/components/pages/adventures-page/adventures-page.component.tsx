import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardGrid from '../../card-grid/card-grid.component'
import { IAdventure } from '../../../utils/types'
import SearchBar from '../../search-bar/search-bar.component'
import { formatDateFromString } from '../../../utils/functions'
import GuestSignInMessage from '../../guest-signed-in-message/guest-sign-in-message.component'
import Header from '../../header/header.component'

const AdventuresPage = () => {
  const [Adventures, setAdventures] = useState<IAdventure[]>()
  const [SearchField, setSearchField] = useState<string>('')

  useEffect(() => {
    async function fetchlocation() {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_ORIGIN}/api/adventures`,
      )
      setAdventures(responce.data.reverse())
    }
    fetchlocation()
  }, [])

  const filteredAdventures = Adventures?.filter(
    (adventure) =>
      adventure.name.toLowerCase().includes(SearchField.toLowerCase().trim()) ||
      formatDateFromString(adventure.date)
        .toLowerCase()
        .includes(SearchField.toLowerCase().trim()) ||
      adventure.description
        .toLowerCase()
        .includes(SearchField.toLowerCase().trim()),
  )

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="page-title">Adventures</h2>
        <GuestSignInMessage />
        <SearchBar
          placeholder="Search"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchField(e.target.value)
          }
        />
        <CardGrid adventures={filteredAdventures} />
      </div>
    </>
  )
}

export default AdventuresPage
