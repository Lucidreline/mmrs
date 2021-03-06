import { Router, Request } from 'express'
import User from '../models/User'
import bycript from 'bcryptjs'
import config from 'config'

const router = Router()

declare module 'express-session' {
  // this is to fix req.session not letting us add the user in the session
  interface Session {
    [key: string]: any
  }
}

router.get('/current-user', async (req, res) => {
  try {
    const {
      username,
      email,
      adventures,
      location,
      pinPoints,
    } = await User.findById(req.session.user._id)

    res.json({ username, email, adventures, location, pinPoints })
  } catch (err) {
    res.json({ err: 'Error getting current user.' })
  }
})

router.post('/sign-up', async (req: Request, res) => {
  try {
    const { email, username, password } = req.body

    const salt = await bycript.genSalt(10) // 10 is the complexity of the salt
    const hashedPassword = await bycript.hash(password, salt)

    const user = new User({
      email,
      username,
      password: hashedPassword,
      adventures: [],
      locations: [],
      pinPoints: [],
    })
    const savedUser = await user.save()

    const dataToSendBack = {
      _id: savedUser._id,
      email: savedUser.email,
      username: savedUser.username,
    }

    req.session.user = dataToSendBack
    res.json(dataToSendBack).status(200)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

router.post('/sign-in', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username: username })
  if (!user) return res.json({ err: 'Username or passowrd is wrong.' })

  const validPass = await bycript.compare(password, user.password)
  if (!validPass)
    return res.json({ err: 'Username or passowrd is wrong.' }).status(400)

  // if you made it here then the user is legit
  const dataToSendBack = {
    _id: user.id,
    username: user.username,
    email: user.email,
  }
  req.session.user = dataToSendBack
  res.json(dataToSendBack)
})

router.post('/log-out', async (req, res) => {
  const guest = await User.findOne({
    username: config.get('guestUser.username'),
  })
  const { _id, username, email } = guest
  req.session.user = { _id, username, email }
  res.json({ _id, username, email }).status(200)
})

export { router }

export const guestUser = async () => {
  const guest = await User.findOne({
    username: config.get('guestUser.username'),
  })

  if (!guest) {
    const { username, email, password } = config.get('guestUser')
    const salt = await bycript.genSalt(10) // 10 is the complexity of the salt
    const hashedPassword = await bycript.hash(password, salt)
    await User.create({ username, email, password: hashedPassword })
  }
}
