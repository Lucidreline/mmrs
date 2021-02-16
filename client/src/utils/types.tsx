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