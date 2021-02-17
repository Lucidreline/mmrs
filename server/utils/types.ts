import { Session } from 'express-session'

declare module 'express-session' {
  // this is to fix req.session not letting us add the user in the session
  interface Session {
    [key: string]: any
  }
}
