import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Btn from '../btn/btn.component'
import Input from '../input/input.component'
import DragAndDrop from '../drag-and-drop/drag-and-drop.component'

import './adventure-form.styles.scss'

interface IAdventureData {
  name: string
  description: string
  lat: number
  lon: number
  files: File[]
}

const AdventureForm = () => {
  const history = useHistory()
  const [AdventureData, setAdventureData] = useState<IAdventureData>({
    name: '',
    description: '',
    lat: 0,
    lon: 0,
    files: [],
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setAdventureData((prevState) => {
      return { ...prevState, [name]: value }
    })

    if (e.currentTarget.value.trim() !== '')
      e.currentTarget.classList.add('valid')
    else e.currentTarget.classList.remove('valid')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const today = Date.now()
    const date = new Date(today).toString()

    const { name, description, lat, lon } = AdventureData

    // send to api
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_ORIGIN}/api/adventures/new`,
      data: {
        adventure: {
          name,
          description,
          date,
          location: null,
          pictures: await grabImageUrls(),
        },
        lat,
        lon,
      },
    }).then((res) => {
      console.log(res)
      // go back to map
      history.push('/map')
    })
  }

  const onDrop = (acceptedFiles: File[]) => {
    setAdventureData((prevState) => {
      return {
        ...prevState,
        files: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      }
    })
  }

  const grabImageUrls = () => {
    const uploadURL = 'https://api.cloudinary.com/v1_1/cheese-itz/image/upload'
    const uploadPreset = 'mmrsProj'

    let promises: any[] = []

    AdventureData.files.forEach((file) => {
      promises.push(
        new Promise<string>(async (resolve) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('upload_preset', uploadPreset)
          await axios({
            url: uploadURL,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: formData,
          })
            .then((res) => {
              resolve(res.data.secure_url)
            })
            .catch((err) => console.log(err))
        }),
      )
    })
    return Promise.all(promises)
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

      <DragAndDrop files={AdventureData.files} onDrop={onDrop} />

      <Btn className="needs-margin-top" type="submit" color="orange">
        Upload
      </Btn>
    </form>
  )
}

export default AdventureForm