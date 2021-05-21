import { Router } from 'express'
import Adventure from '../models/Adventure'
import Location from '../models/Location'

const router = Router()

// lists all locations in the database
router.get('/', async (req, res) => {
  try {
    res
      .json(await Location.find({ createdBy: req.session.user._id }))
      .status(200)
  } catch (err) {
    res.json({ err: err.message }).status(500)
  }
})

// returns the location based on the id and all its adventures
router.get('/id-and-adventures', async (req, res) => {
  try {
    const adventures = await Adventure.find({
      location: (req.query as any).locationId,
      createdBy: req.session.user._id,
    })
    const location = await Location.findById(req.query.locationId)
    if (location.createdBy._id.toString() !== req.session.user._id.toString())
      return res.json({ err: 'Unauthorized.' })

    return res.json({ location, adventures }).status(200)
  } catch (err) {
    return res.json({ err: err.message }).status(500)
  }
})

export { router }
