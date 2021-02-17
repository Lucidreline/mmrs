import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import config from 'config'

const guestSignIn = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    req.session.user = await User.findOne({
      username: config.get('guestUser.username'),
    })
  }
  next()
}

export default guestSignIn
