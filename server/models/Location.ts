import mongoose from 'mongoose'
import { Id } from 'ts-mongoose/types/_shared'

export interface ILocation extends mongoose.Document {
  lon: string
  lat: string

  adventures: Id[]
  radius: number
}

const LocationSchema = new mongoose.Schema({
  lon: String,
  lat: String,

  adventures: [mongoose.Schema.Types.ObjectId],
  radius: Number,
})

const Location = mongoose.model<ILocation>('location', LocationSchema)

export default Location
