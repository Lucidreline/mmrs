import mongoose from 'mongoose'

export interface IPinPoint extends mongoose.Document {
  coordinates: {
    lat: number
    lon: number
  }

  msg: string

  createdBy: mongoose.Types.ObjectId
}

const PinPointSchema = new mongoose.Schema({
  coordinates: { lat: Number, lon: Number },

  msg: String,

  createdBy: mongoose.Schema.Types.ObjectId,
})

const PinPoint = mongoose.model<IPinPoint>('pinPoint', PinPointSchema)

export default PinPoint
