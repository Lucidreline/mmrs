import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bodyParser from 'body-parser'
import express from 'express'
import config from 'config'
import path from 'path'
import cors from 'cors'

import connectDB from './utils/connectDB'

import { router as adventuresRouter } from './routes/adventures'
import { router as locationsRouter } from './routes/locations'
import { guestUser, router as usersRouter } from './routes/users'
import guestSignInByDefault from './middlewares/guest-sign-in'

connectDB()

const app = express()

app.use(cookieParser())

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
  session({
    secret: config.get('session.secret'),
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: config.get('session.maxAge'),
    },
  }),
)

app.use(
  cors({
    credentials: true,
  }),
)

// routes
app.use('/api/adventures', adventuresRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.redirect('/map')
})

// serve static assets in front end
app.use(express.static('../client/build'))

app.get('/map', guestSignInByDefault, (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
  )

  res.sendFile(
    path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'),
  )
})

app.get('*', guestSignInByDefault, (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
  )

  res.sendFile(
    path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'),
  )
})

app.listen(config.get('port'), () => {
  console.log(`Server Online on port ${config.get('port')}!`)
  guestUser()
})
