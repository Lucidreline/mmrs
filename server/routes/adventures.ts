import { Router } from 'express'
import config from 'config'
import fetch from 'node-fetch'
import axios from 'axios'
import mongoose from 'mongoose'

const router = Router()

import Adventure, { IAdventure } from '../models/Adventure'
import Location, { ILocation } from '../models/Location'
import User, { IUser } from '../models/User'

import Cloudinary, { deleteImagesFromCloudinary } from '../utils/cloudinary'
import { deleteLocation } from './locations'

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

  const currentUser: IUser = await User.findById(req.session.user._id)
  // deletes an old adventure if guest is signed in
  const adventuresAllowed = 3
  if (currentUser.username === config.get('guestUser.username')) {
    if (currentUser.adventures.length >= adventuresAllowed) {
      // delete the oldest user
      console.log('gonna delete now')
      await deleteAdventure(req, currentUser.adventures[0].toString())
    }
  }

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
  await deleteAdventure(req, req.params.id).then(() => {
    res.json({ msg: 'success' })
  })
})

export { router }

const deleteAdventure = async (req: any, _id: string) => {
  const adventureToDelete = await Adventure.findById(_id)

  // delete adventure id from the user
  const currentUser: IUser = await User.findById(req.session.user._id)
  const indexOfAdventureIDInUser = currentUser.adventures.indexOf(
    adventureToDelete._id,
  )

  if (indexOfAdventureIDInUser > -1) {
    currentUser.adventures.splice(indexOfAdventureIDInUser, 1)
  }

  await currentUser.save()

  // delete adventure id from the location
  const adventureLocation: ILocation = await Location.findById(
    adventureToDelete.location,
  )
  // if the location is now empty, delete it
  if (adventureLocation.adventures.length < 2) {
    // delete location
    console.log('deleting location')
    deleteLocation(req, adventureLocation._id.toString())
  } else {
    // just remove location id
    console.log('removing id')
    const indexOfAdventureIDInLocation = adventureLocation.adventures.indexOf(
      adventureToDelete._id,
    )

    if (indexOfAdventureIDInLocation > -1) {
      adventureLocation.adventures.splice(indexOfAdventureIDInLocation, 1)
    }
  }

  // delete photos from adventure stored in cloudinary
  await deleteImagesFromCloudinary(adventureToDelete.pictures)
  await Adventure.deleteOne({ _id: _id })
}
