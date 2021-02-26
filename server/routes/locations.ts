import { Router } from 'express'
import Adventure from '../models/Adventure'
import Location from '../models/Location'
import User, { IUser } from '../models/User'
import { deleteImagesFromCloudinary } from '../utils/cloudinary'

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
export const deleteLocation = async (req: any, _id: string) => {
  try {
    const locationToDelete = await Location.findById(_id)
    console.log('location to delete', locationToDelete)

    // delete location id from user
    const currentUser: IUser = await User.findById(req.session.user._id)
    const indexOfLocationID = currentUser.locations.indexOf(
      locationToDelete._id,
    )

    if (indexOfLocationID > -1) {
      currentUser.adventures.splice(indexOfLocationID, 1)
    }

    await currentUser.save()

    // delete map photo stored in cloudinary
    await deleteImagesFromCloudinary([locationToDelete.mapImage])

    await Location.deleteOne({ _id: _id })
  } catch (error) {
    console.log(error)
  }
}
