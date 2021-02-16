import mongoose from 'mongoose'

export interface IAdventure extends mongoose.Document {
  name: string
  description: string
  date: string
  prictures: string[] // links to images of that day

  createdBy: mongoose.Types.ObjectId
  location: mongoose.Types.ObjectId // id of its location model
}

const AdventureSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: String,
  pictures: [],

  location: mongoose.Schema.Types.ObjectId,
  createdBy: mongoose.Schema.Types.ObjectId,
})

const Adventure = mongoose.model<IAdventure>('adventure', AdventureSchema)

export default Adventure
