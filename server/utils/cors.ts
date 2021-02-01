import config from 'config'

const whitelist: string[] = config.get('originsAllowed')
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log(`Origin trying to connect ${origin}`)
      callback(new Error('Not allowed by CORS'))
    }
  },
}

export default corsOptions
