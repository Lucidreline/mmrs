import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Btn from '../btn/btn.component'
import Input from '../input/input.component'
import DragAndDrop from '../drag-and-drop/drag-and-drop.component'

import './adventure-form.styles.scss'

const AdventureForm = () => {
  const history = useHistory()
  const [FormData1, setFormData1] = useState({
    name: '',
    description: '',
    lat: 0,
    lon: 0,
    files: [],
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormData1((prevState) => {
      return { ...prevState, [name]: value }
    })

    if (e.currentTarget.value.trim() !== '')
      e.currentTarget.classList.add('valid')
    else e.currentTarget.classList.remove('valid')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    upload()
    const { name, description, lat, lon } = FormData1
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

  const [files, setFiles] = useState<File[]>([])

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    )
  }

  const upload = () => {
    const uploadURL = 'https://api.cloudinary.com/v1_1/' // not valid
    const uploadPreset = ''

    files.forEach((file) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      axios({
        url: uploadURL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: formData,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
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

      <DragAndDrop files={files} onDrop={onDrop} />

      <Btn className="needs-margin-top" type="submit" color="orange">
        Upload
      </Btn>
    </form>
  )
}

export default AdventureForm
