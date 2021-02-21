import React, { useEffect, useState } from 'react'
import fetchCurrentUser from '../../utils/fetch-current-user'
import Message, { IStyles } from '../message/message.component'

interface IProps extends IStyles {}

const GuestSignInMessage = ({ ...otherProps }: IProps) => {
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
  return <Message msg={Msg} status="warning" {...otherProps} />
}

export default GuestSignInMessage
