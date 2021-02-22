import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import config from 'config'

const guestSignInByDefault = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session.user) {
    await signInGuest(req)
  }
  next()
}

export const signInGuest = async (req: Request) => {
  const { _id, email, username } = await User.findOne({
    username: config.get('guestUser.username'),
  })
  req.session.user = { _id, username, email }
}

export default guestSignInByDefault
