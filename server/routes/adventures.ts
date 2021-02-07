import { Router } from 'express'
import config from 'config'
import fetch from 'node-fetch'

const router = Router()

import Adventure from '../models/Adventure'
import Location, { ILocation } from '../models/Location'

const distance = (point1: number[], point2: number[]) => {
  return Math.sqrt(
    Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2),
  )
}

// lists all adventures in the database
router.get('/', async (req, res) => {
  try {
    res.json(await Adventure.find({})).status(200)
  } catch (err) {
    res.json({ err: err.message }).status(500)
  }
})

// created a new adventure and a location if one is needed.
router.post('/new', async (req, res) => {
  const { adventure, lon, lat } = req.body
  console.log(adventure)

  try {
    const locations: ILocation[] = await Location.find({}) // puts all locations into an array
    let locationNearAdventure = null

    for (let i = 0; i < locations.length; i++) {
      const d = distance([locations[i].lon, locations[i].lat], [lon, lat])

      if (d < 0.1) {
        locationNearAdventure = locations[i]
        break
      }
    }
    if (locationNearAdventure == null) {
      // no locations near adventure, have to create a new location

      let name = ''

      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${config.get(
          'googleMapsApiKey',
        )}`,
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.results.length > 0) {
            const addressComponents = json.results[0].address_components

            for (let i = 0; i < addressComponents.length; i++) {
              if (addressComponents[i].types.includes('locality')) {
                name = addressComponents[i].short_name
                break
              } else if (
                addressComponents[i].types.includes(
                  'administrative_area_level_2',
                )
              ) {
                name = addressComponents[i].short_name
                break
              }
            }
          }
        })

      locationNearAdventure = await Location.create({
        // creating it here because i need a location _id
        lat,
        lon,

        name,

        adventures: [],
        radius: 12000,
      })

      adventure.location = locationNearAdventure._id
    } else {
      adventure.location = locationNearAdventure._id
    }
    const adventureInDatabase = await Adventure.create(adventure)
    locationNearAdventure.adventures.push(adventureInDatabase._id)
    await locationNearAdventure.save()

    res.json(adventure).status(200)
  } catch (err) {
    res.json({ err: err.message }).status(500)
  }
})

export { router }
