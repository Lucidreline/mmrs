import helmet from 'helmet'
import express from 'express'
import path from 'path'
import config from 'config'

const app = express()

app.use(helmet())

// serve static assets in front end
app.use(express.static('../client/build'))

app.get('*', (req, res) => {
  res.setHeader('Content-Security-Policy', 'img-src https: data:;')
  res.sendFile(
    path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'),
  )
})

app.listen(config.get('port'), () =>
  console.log(`Server Online on port ${config.get('port')}!`),
)
