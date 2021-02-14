import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Btn from '../btn/btn.component'
import Input from '../input/input.component'
import DragAndDrop from '../drag-and-drop/drag-and-drop.component'
import DatePicker from 'react-date-picker'

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

  const urlArr = useLocation().pathname.split('/')
  const [AdventureData, setAdventureData] = useState<IAdventureData>(() => {
    let lat = 0,
      lon = 0

    if (urlArr.includes('coordinates') && urlArr.length > 3) {
      const coordinates = urlArr[3].split(',')
      lat = parseFloat(coordinates[0])
      lon = parseFloat(coordinates[1])
    }

    return {
      name: '',
      description: '',
      lat,
      lon,
      files: [],
    }
  })

  const [AdventureTime, setAdventureTime]: any[] = useState(new Date())

  useEffect(() => {
    if (urlArr.includes('coordinates') && urlArr.length > 3) {
      const coordinates = urlArr[3].split(',')
      const lat = parseFloat(coordinates[0])
      const lon = parseFloat(coordinates[1])
      setAdventureData((prevState) => {
        return { ...prevState, lat, lon }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

    const { name, description, lat, lon } = AdventureData

    // send to api
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_ORIGIN}/api/adventures/new`,
      data: {
        adventure: {
          name,
          description,
          date: AdventureTime.toString(),
          location: null,
          pictures: await grabImageUrls(),
        },
        lat,
        lon,
      },
    }).then(() => {
      // go back to map
      history.push(`/map/goto/${lat},${lon}`)
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
    const uploadPreset =
      process.env.REACT_APP_CLOUDINARY_PRESET || 'mmrsProjDev'

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
    <>
      <h2 className="page-title">Adventure Form</h2>
      <form onSubmit={handleSubmit} className="adventure-form container">
        <Input
          activated={AdventureData.name.length > 0 ? true : false}
          value={AdventureData.name}
          type="text"
          name="name"
          placeholder="Name"
          handleChange={handleChange}
        />
        <Input
          activated={AdventureData.lat !== 0 ? true : false}
          value={AdventureData.lat !== 0 ? AdventureData.lat : ''}
          type="number"
          name="lat"
          placeholder="Latitude"
          handleChange={handleChange}
        />
        <Input
          activated={AdventureData.lon !== 0 ? true : false}
          value={AdventureData.lon !== 0 ? AdventureData.lon : ''}
          type="number"
          name="lon"
          placeholder="Longitude"
          handleChange={handleChange}
        />

        <Input
          activated={AdventureData.description.length > 0 ? true : false}
          value={AdventureData.description}
          type="textArea"
          name="description"
          placeholder="Description"
          handleChange={handleChange}
        />

        <div className="drag-and-drop-container">
          <DragAndDrop files={AdventureData.files} onDrop={onDrop} />
        </div>

        <div className="date-picker-container">
          <DatePicker onChange={setAdventureTime} value={AdventureTime} />
        </div>

        <Btn
          size="lg"
          className="needs-margin-top"
          type="submit"
          color="orange"
        >
          Upload
        </Btn>
      </form>
    </>
  )
}

export default AdventureForm
