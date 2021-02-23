import React, { useState } from 'react'
import Input from '../../input/input.component'

interface IPinPoint {
  lat: number
  lon: number
  msg: string
}

const PinPointForm = () => {
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

  return (
    <div className="pin-point-form">
      <h2 className="page-title">Pin Point Form</h2>
      <form>
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
      </form>
    </div>
  )
}

export default PinPointForm
