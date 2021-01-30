import { Router } from 'express'
import Location from '../models/Location'

const router = Router()

// lists all locations in the database
router.get('/', async (req, res) => {
  try {
    res.json(await Location.find({})).status(200)
  } catch (err) {
    res.json({ err: err.message }).status(500)
  }
})

export { router }
