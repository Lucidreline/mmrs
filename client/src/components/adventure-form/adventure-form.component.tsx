import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Btn from '../btn/btn.component'
import Input from '../input/input.component'

import './adventure-form.styles.scss'

const AdventureForm = () => {
  const history = useHistory()
  const [FormData, setFormData] = useState({
    name: '',
    description: '',
    lat: 0,
    lon: 0,
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormData((prevState) => {
      return { ...prevState, [name]: value }
    })

    if (e.currentTarget.value.trim() !== '')
      e.currentTarget.classList.add('valid')
    else e.currentTarget.classList.remove('valid')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, description, lat, lon } = FormData
    const adventure = {
      name,
      description,
      date: 'today',
      location: null,
      pictures: ['pic 1', 'pic 2'],
    }

    // send to api
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_ORIGIN}/api/adventures/new`,
      data: {
        adventure,
        lat,
        lon,
      },
    }).then(() => {
      // go back to map
      history.push('/map')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">Adventure Details!</h2>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        handleChange={handleChange}
      />
      <Input
        type="number"
        name="lat"
        placeholder="Latitude"
        handleChange={handleChange}
      />
      <Input
        type="number"
        name="lon"
        placeholder="Longitude"
        handleChange={handleChange}
      />
      <Input
        type="textArea"
        name="description"
        placeholder="Description"
        handleChange={handleChange}
      />
      <Btn className="needs-margin-top" type="submit" color="orange">
        Upload
      </Btn>
    </form>
  )
}

export default AdventureForm
