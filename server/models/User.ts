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
  username: String,
  password: String,

  adventures: [mongoose.Schema.Types.ObjectId],
  locations: [mongoose.Schema.Types.ObjectId],
  pinPoints: [mongoose.Schema.Types.ObjectId],
})

const User = mongoose.model<IUser>('user', UserSchema)

export default User
