import cloudinary from 'cloudinary'
const Cloudinary = cloudinary.v2

import config from 'config'

Cloudinary.config({
  cloud_name: config.get('coudinaryName'),
  api_key: config.get('cloudinaryKey'),
  api_secret: config.get('cloudinarySecret'),
})

// code from my bobby :)
const getPublicID = (url: string) => {
  const urlArray = url.split('/')

  for (let i = 0; i < 7; i++) urlArray.shift()

  let publicID = ''
  for (let i = 0; i < urlArray.length; i++) {
    publicID += urlArray[i] + '/'
  }

  const lastIndex = publicID.lastIndexOf('.')
  publicID = publicID.substring(0, lastIndex)
  return publicID
}

export const deleteImagesFromCloudinary = async (images: string[]) => {
  let publicIDs: string[] = []

  for (let i = 0; i < images.length; i++) {
    publicIDs.push(getPublicID(images[i]))
  }

  await Cloudinary.api.delete_resources(publicIDs)
}

export default Cloudinary
