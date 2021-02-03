import React, { FormEvent, useState } from 'react'
import Btn from '../btn/btn.component'
import Input from '../input/input.component'

import './adventure-form.styles.scss'

const AdventureForm = () => {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //const { name, email, message } = this.state

    // send to api
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
        placeholder="longitude"
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
