import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IPinPoint } from '../../../utils/types'
import Btn from '../../btn/btn.component'
import Header from '../../header/header.component'
import Input from '../../input/input.component'

const PinPointForm = () => {
  const history = useHistory()
  const [PinPoint, setPinPoint] = useState<IPinPoint>({
    lat: 0,
    lon: 0,
    msg: '',
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setPinPoint((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { lat, lon, msg } = PinPoint
    const pinPoint = {
      lat,
      lon,
      msg,
    }

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_ORIGIN}/api/pin-points/new`,
      data: {
        pinPoint,
      },
    }).then(() => {
      // go back to map
      history.push(`/map/goto/${lat},${lon}`)
    })
  }

  return (
    <>
      <Header />
      <div className="pin-point-form">
        <h2 className="page-title">Pin Point Form</h2>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Latitude"
            type="number"
            name="lat"
            handleChange={handleChange}
            value={PinPoint.lat !== 0 ? PinPoint.lat : ''}
            activated={PinPoint.lat !== 0 ? true : false}
          />
          <Input
            placeholder="Longitude"
            type="number"
            name="lon"
            handleChange={handleChange}
            value={PinPoint.lon !== 0 ? PinPoint.lon : ''}
            activated={PinPoint.lon !== 0 ? true : false}
          />
          <Input
            placeholder="Message"
            type="text"
            name="msg"
            handleChange={handleChange}
            value={PinPoint.msg.length > 0 ? PinPoint.msg : ''}
            activated={PinPoint.msg.length > 0 ? true : false}
          />
          <Btn size="lg" className="needs-margin-top" type="submit">
            Create Pin
          </Btn>
        </form>
      </div>
    </>
  )
}

export default PinPointForm
