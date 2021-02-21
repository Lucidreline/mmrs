import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { guestExsists } from '../../../utils/fetch-current-user'
import Btn from '../../btn/btn.component'
import Input from '../../input/input.component'
import Message from '../../message/message.component'

interface ISignInFormInputs {
  username: string
  password: string
}

const SignInPage = () => {
  const [FormInputs, SetFormInputs] = useState<ISignInFormInputs>({
    username: '',
    password: '',
  })

  const [ErrorMsg, setErrorMsg] = useState('')
  const [GuestMsg, setGuestMsg] = useState('')

  useEffect(() =>{
    const updateGuestMsg = async () => {
      await guestExsists().then((isGuest) => {
        isGuest ? setGuestMsg('Currently signed in as Guest.') : setGuestMsg('')
      })
    }

    updateGuestMsg()
  })

  const history = useHistory()

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    SetFormInputs((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { username, password } = FormInputs

    // send to api
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_ORIGIN}/api/users/sign-in`,
      data: {
        username,
        password,
      },
    }).then((res) => {
      if (res.data.err) {
        SetFormInputs({ username: '', password: '' })
        setErrorMsg(res.data.err)
      } else {
        history.push('/map')
      }
    })
  }

  

  return (
    <div className="sign-in-page">
      <h2 className="page-title">Sign In</h2>
      <Message msg={GuestMsg} status='warning'/>
      <Message msg={ErrorMsg} status="error" />
      <form className="sign-in-form container" onSubmit={handleSubmit}>

        <Input
          activated={FormInputs.username.length > 0 ? true : false}
          value={FormInputs.username}
          type="text"
          name="username"
          placeholder="Username"
          handleChange={handleChange}
        />

        <Input
          activated={FormInputs.password.length > 0 ? true : false}
          value={FormInputs.password}
          type="password"
          name="password"
          placeholder="Password"
          handleChange={handleChange}
        />
        <Btn size="lg" type="submit" className="needs-margin-top">
          Sign In
        </Btn>
      </form>
    </div>
  )
}

export default SignInPage
