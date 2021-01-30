import { Router } from 'express'

const router = Router()

import Adventure from '../models/Adventure'
import Location, { ILocation } from '../models/Location'

const distance = (point1: number[], point2: number[]) => {
  return Math.sqrt(
    Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2),
  )
}

router.post('/new', async (req, res) => {
  const { adventure, lon, lat } = req.body

  try {
    const locations: ILocation[] = await Location.find({}) // puts all locations into an array
    let locationNearAdventure = null

    for (let i = 0; i < locations.length; i++) {
      const d = distance(
        [parseInt(locations[i].lon), parseInt(locations[i].lat)],
        [parseInt(lon), parseInt(lat)],
      )

      if (d < 0.1) {
        locationNearAdventure = locations[i]
        break
      }
    }
    if (locationNearAdventure == null) {
      // no locations near adventure, have to create a new location
      locationNearAdventure = await Location.create({
        // creating it here because i need a location _id
        lon,
        lat,

        adventures: [],
        radius: 10000,
      })

      adventure.location = locationNearAdventure._id
    } else {
      adventure.location = locationNearAdventure._id
    }
    const adventureInDatabase = await Adventure.create(adventure)
    locationNearAdventure.adventures.push(adventureInDatabase._id)
    await locationNearAdventure.save()

    res.json(adventure).status(200)
  } catch (error) {
    console.log(error.message)
    res.json({ msg: 'error' }).status(500)
  }
})

export { router }
