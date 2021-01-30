import mongoose from 'mongoose'
import { Id } from 'ts-mongoose/types/_shared'

export interface IAdventure extends mongoose.Document {
  name: string
  description: string
  date: string
  location: Id // id of its location model
  prictures: string[] // links to images of that day
}

const AdventureSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: String,
  location: mongoose.Schema.Types.ObjectId,
  pictures: [],
})

const Adventure = mongoose.model<IAdventure>('adventure', AdventureSchema)

export default Adventure
