import helmet from 'helmet'
import express from 'express'
import path from 'path'

const app = express()

app.use(helmet())

app.get('/', (req, res) => {
  res.send('Hello World')
})

// serve static assets in front end
app.use(express.static('../client/build'))

app.get('*', (req, res) => {
  res.setHeader('Content-Security-Policy', 'img-src https: data:;')
  res.sendFile(
    path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'),
  )
})

app.listen(3050, () => console.log('Server Online!'))
