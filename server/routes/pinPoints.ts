import { Router } from 'express'
import PinPoint from '../models/PinPoint'
import User from '../models/User'

const router = Router()

router.get('/', async (req, res) => {
  const pinPoints = await PinPoint.find({ createdBy: req.session.user._id })
  res.json(pinPoints).status(200)
})

router.post('/new', async (req, res) => {
  const pinPoint = req.body.pinPoint

  const user = await User.findById(req.session.user._id)
  pinPoint.createdBy = user._id

  const createdPinPoint = await PinPoint.create(pinPoint)

  user.pinPoints.push(createdPinPoint._id)
  await user.save()
  res.json(createdPinPoint)
})

export { router }
