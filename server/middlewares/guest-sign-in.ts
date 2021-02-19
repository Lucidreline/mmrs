import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import config from 'config'

const guestSignIn = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    const { _id, email, username } = await User.findOne({
      username: config.get('guestUser.username'),
    })
    req.session.user = { _id, username, email }
  }
  next()
}

export default guestSignIn
