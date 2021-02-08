import cloudinary from 'cloudinary'
const Cloudinary = cloudinary.v2

import config from 'config'

Cloudinary.config({
  cloud_name: config.get('coudinaryName'),
  api_key: config.get('cloudinaryKey'),
  api_secret: config.get('cloudinarySecret'),
})

export default Cloudinary
