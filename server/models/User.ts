import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  email: string
  username: string
  password: string

  adventures: mongoose.Types.ObjectId[]
  locations: mongoose.Types.ObjectId[]
  pinPoints: mongoose.Types.ObjectId[]
}

const UserSchema = new mongoose.Schema({
  email: String,
  username: { type: String, unique: true },
  password: String,

  adventures: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  locations: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  pinPoints: { type: [mongoose.Schema.Types.ObjectId], default: [] },
})

const User = mongoose.model<IUser>('user', UserSchema)

export default User
