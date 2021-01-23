import React, { Component } from 'react'

import Map from '../../map/map.component'

export interface ILocation {
  lon: number
  lat: number
  radius: number
  _id: string
  [key: string]: any
}

interface Iprops {}

interface IState {
  locations: ILocation[]
}

class MapPage extends Component<Iprops, IState> {
  constructor(props: Iprops) {
    super(props)
    this.state = {
      locations: [
        {
          lat: 33.888,
          lon: -118.309,
          radius: 5000,
          _id: 'whaat',
        },
        {
          lat: 33.988,
          lon: -118.409,
          radius: 10000,
          _id: 'whaat no way',
        },
        {
          lat: 34,
          lon: -118.509,
          radius: 15000,
          _id: 'seriously?',
        },
      ],
    }
  }
  render() {
    return (
      <div>
        <Map locations={this.state.locations} />
      </div>
    )
  }
}

export default MapPage
