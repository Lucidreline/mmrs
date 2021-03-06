import { Router } from 'express'
import config from 'config'
import fetch from 'node-fetch'
import axios from 'axios'

const router = Router()

import Adventure, { IAdventure } from '../models/Adventure'
import Location, { ILocation } from '../models/Location'
import User, { IUser } from '../models/User'

import Cloudinary, { deleteImagesFromCloudinary } from '../utils/cloudinary'

const distance = (point1: number[], point2: number[]) => {
  return Math.sqrt(
    Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2),
  )
}

// lists all adventures in the database
router.get('/', async (req, res) => {
  try {
    res
      .json(await Adventure.find({ createdBy: req.session.user._id }))
      .status(200)
  } catch (err) {
    res.json({ err: err.message }).status(500)
  }
})

// gets an adventure based on the id in the url
router.get('/id', async (req, res) => {
  try {
    if ((req.query as any).adventureId == undefined)
      throw 'An Adventure ID was not provided.'

    const adventure: IAdventure = await Adventure.findById(
      (req.query as any).adventureId,
    )

    if (adventure.createdBy.toString() !== req.session.user._id) {
      return res.json({ err: 'Unathorized.' })
    }

    let includeLocation = false

    if ((req.query as any).includeLocation !== undefined) {
      includeLocation = (req.query as any).includeLocation ? true : false
    }

    if (includeLocation) {
      const location = await Location.findById(adventure.location)
      res.json({ adventure, location })
    } else {
      res.json(adventure).status(200)
    }
  } catch (err) {
    res.json({ err: err.message }).status(500)
  }
})

// created a new adventure and a location if one is needed.
router.post('/new', async (req, res) => {
  const { adventure, lon, lat } = req.body

  const currentUser = await User.findById(req.session.user._id)

  const getMapImageFileStr = () => {
    return new Promise<string>(async (resolve) => {
      const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=13&size=600x300&maptype=terrain&key=${config.get(
        'googleMapsApiKey',
      )}`
      axios
        .get(url, {
          responseType: 'arraybuffer',
        })
        .then((response) =>
          resolve(
            'data:image/jpeg;base64,' +
              Buffer.from(response.data, 'binary').toString('base64'),
          ),
        )
    })
  }

  const getMapImageCloudinaryUrl = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await getMapImageFileStr().then(async (fileStr) => {
          const uploadRes = await Cloudinary.uploader.upload(fileStr, {
            upload_preset: config.get('cloudinaryMapPreset'),
          })
          resolve(uploadRes.secure_url)
        })
      } catch (err) {
        resolve(res.status(500))
      }
    })
  }

  try {
    const locations: ILocation[] = await Location.find({
      createdBy: currentUser._id,
    }) // puts all locations into an array
    let locationNearAdventure = null

    for (let i = 0; i < locations.length; i++) {
      const d = distance([locations[i].lon, locations[i].lat], [lon, lat])

      if (d < 0.1) {
        locationNearAdventure = locations[i]
        break
      }
    }
    let createdNewLocation = false

    if (locationNearAdventure == null) {
      // no locations near adventure, have to create a new location
      createdNewLocation = true
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

        mapImage: await getMapImageCloudinaryUrl(),

        createdBy: currentUser._id,

        adventures: [],
        radius: 12000,
      })
    }
    adventure.location = locationNearAdventure._id
    adventure.createdBy = currentUser._id

    const adventureInDatabase = await Adventure.create(adventure)
    locationNearAdventure.adventures.push(adventureInDatabase._id)
    await locationNearAdventure.save()

    currentUser.adventures.push(adventureInDatabase._id)
    if (createdNewLocation)
      currentUser.locations.push(locationNearAdventure._id)

    await currentUser.save().then(() => res.json(adventure).status(200))
  } catch (err) {
    res.json({ err: err.message }).status(500)
  }
})

router.delete('/:id', async (req, res) => {
  // delete adventure from database
  const deletedAdventure: IAdventure = await Adventure.findByIdAndRemove(
    req.params.id,
  )

  // delete adventure id from the user
  const currentUser: IUser = await User.findById(req.session.user._id)
  const indexOfAdventureID = currentUser.adventures.indexOf(
    deletedAdventure._id,
  )
  if (indexOfAdventureID > -1) {
    currentUser.adventures.splice(indexOfAdventureID, 1)
  }
  await currentUser.save()

  // delete photos from adventure stored in cloudinary
  await deleteImagesFromCloudinary(deletedAdventure.pictures)

  res.json({ msg: 'success' })
})

export { router }
