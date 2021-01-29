import helmet from 'helmet'
import express from 'express'
import path from 'path'
import config from 'config'

import { router as locationsRouter } from './routes/locations'

const app = express()

app.use(helmet())

// routes
app.use('/api/locations', locationsRouter)

// serve static assets in front end
app.use(express.static('../client/build'))

app.get('*', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
  )
  res.sendFile(
    path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'),
  )
})

app.listen(config.get('port'), () =>
  console.log(`Server Online on port ${config.get('port')}!`),
)
