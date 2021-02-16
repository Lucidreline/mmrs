import mongoose from 'mongoose'

export interface ILocation extends mongoose.Document {
  lat: number
  lon: number

  name: string

  mapImage: string

  adventures: mongoose.Types.ObjectId[]
  createdBy: mongoose.Types.ObjectId
  radius: number
}

const LocationSchema = new mongoose.Schema({
  lat: Number,
  lon: Number,

  name: String,

  mapImage: String,

  adventures: [mongoose.Schema.Types.ObjectId],
  createdBy: mongoose.Schema.Types.ObjectId,
  radius: Number,
})

const Location = mongoose.model<ILocation>('location', LocationSchema)

export default Location
