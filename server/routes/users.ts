import { Router } from 'express'
import User from '../models/User'
import bycript from 'bcryptjs'

const router = Router()

router.post('/sign-up', async (req, res) => {
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
      adventures: savedUser.adventures,
      locations: savedUser.locations,
    }

    res.json(dataToSendBack).status(200)
  } catch (err) {
    console.log('hi')
    res.status(500).json({ err: err.message })
  }
})

router.post('/sign-in', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username: username })
  if (!user) return res.json({ err: 'Email or passowrd is wrong.' })

  const validPass = await bycript.compare(password, user.password)
  if (!validPass)
    return res.json({ err: 'Email or passowrd is wrong.' }).status(400)

  // if you made it here then the user is legit
  res.json({ _id: user.id, username: user.username, email: user.email })
})

export { router }
