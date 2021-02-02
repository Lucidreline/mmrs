import mongoose from 'mongoose'
import { Id } from 'ts-mongoose/types/_shared'

export interface ILocation extends mongoose.Document {
  lat: number
  lon: number

  name: string

  adventures: mongoose.Types.ObjectId[]
  radius: number
}

const LocationSchema = new mongoose.Schema({
  lat: Number,
  lon: Number,

  name: String,

  adventures: [mongoose.Schema.Types.ObjectId],
  radius: Number,
})

const Location = mongoose.model<ILocation>('location', LocationSchema)

export default Location
