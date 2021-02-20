import axios from 'axios'
import { IUser } from './types'

interface IResponce {
  data: {
    username: string
    email: string
    locations: string[]
    adventures: string[]
    pinPoints: string[]
  }
}

const fetchCurrentUser = () => {
  return new Promise<IUser>((resolve, reject) => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_ORIGIN}/current-user`)
        .then((res: IResponce) => {
          resolve(res.data)
        })
    } catch (err) {
      reject(err)
    }
  })
}

export default fetchCurrentUser
