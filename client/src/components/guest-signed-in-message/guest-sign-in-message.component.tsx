import React, { useEffect, useState } from 'react'
import fetchCurrentUser from '../../utils/fetch-current-user'
import Message from '../message/message.component'

const GuestSignInMessage = () => {
  const [Msg, setMsg] = useState('')

  useEffect(() => {
    const initMsg = async () => {
      const currentUser = await fetchCurrentUser()
      currentUser.username === 'Guest'
        ? setMsg('Currently signed in as Guest.')
        : setMsg('')
    }

    initMsg()
  })
  return <Message msg={Msg} status="warning" />
}

export default GuestSignInMessage
