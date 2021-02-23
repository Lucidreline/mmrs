import axios from 'axios'
import { IUser } from './types'

interface IResponce {
  data: IUser
}

const fetchCurrentUser = async () => {
  return new Promise<IUser>((resolve, reject) => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_ORIGIN}/api/users/current-user`)
        .then((res: IResponce) => {
          resolve(res.data)
        })
    } catch (err) {
      reject(err)
    }
  })
}

export const guestExsists = async () => {
  try {
    const currentUser = await fetchCurrentUser()

    return currentUser.username === 'Guest' ? true : false
  } catch (error) {
    return false
  }
}

export default fetchCurrentUser
