import { Router } from 'express'
import PinPoint from '../models/PinPoint'
import User from '../models/User'

const router = Router()

router.post('/new', async (req, res) => {
  const pinPoint = req.body.pinPoint

  const user = await User.findById(req.session.user._id)
  pinPoint.createdBy = user._id

  const createdPinPoint = await pinPoint.create(pinPoint)

  user.pinPoints.push(createdPinPoint._id)
  await user.save()
  res.json(createdPinPoint)
})

export { router }
