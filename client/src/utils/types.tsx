export interface ILocation {
  _id: string
  name: string
  mapImage: string
  adventures: string[]
  lat: number
  lon: number
}

export interface IAdventure {
  _id: string
  name: string
  description: string
  date: string
  pictures: string[]
}

export interface IUser {
  email: string
  username: string

  adventures: string[]
  locations: string[]
  pinPoints: string[]
}

export interface IPinPoint {
  lat: number
  lon: number
  msg: string
}
