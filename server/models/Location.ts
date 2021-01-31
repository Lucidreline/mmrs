import mongoose from 'mongoose'
import { Id } from 'ts-mongoose/types/_shared'

export interface ILocation extends mongoose.Document {
  lon: number
  lat: number

  adventures: mongoose.Types.ObjectId[]
  radius: number
}

const LocationSchema = new mongoose.Schema({
  lon: Number,
  lat: Number,

  adventures: [mongoose.Schema.Types.ObjectId],
  radius: Number,
})

const Location = mongoose.model<ILocation>('location', LocationSchema)

export default Location
