import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Btn from '../../btn/btn.component'
import GuestSignInMessage from '../../guest-signed-in-message/guest-sign-in-message.component'
import Header from '../../header/header.component'
import Input from '../../input/input.component'
import Message from '../../message/message.component'

interface ISignUpFormInputs {
  email: string
  username: string
  password: string
}

const SignUpPage = () => {
  const [FormInputs, SetFormInputs] = useState<ISignUpFormInputs>({
    email: '',
    username: '',
    password: '',
  })

  const [ErrorMsg, setErrorMsg] = useState('')

  const history = useHistory()

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    SetFormInputs((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { username, email, password } = FormInputs

    // send to api
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_ORIGIN}/api/users/sign-up`,
      data: {
        username,
        email,
        password,
      },
    }).then((res) => {
      if (res.data.err) {
        SetFormInputs({ username: '', email: '', password: '' })
        setErrorMsg(res.data.err)
      } else {
        history.push('/map')
      }
    })
  }

  return (
    <>
      <Header />
      <div className="sign-up-page">
        <h2 className="page-title">Sign Up</h2>
        <GuestSignInMessage />
        <form className="sign-in-form container" onSubmit={handleSubmit}>
          <Message msg={ErrorMsg} status="error" />

          <Input
            activated={FormInputs.username.length > 0 ? true : false}
            value={FormInputs.username}
            type="text"
            name="username"
            placeholder="Username"
            handleChange={handleChange}
          />
          <Input
            activated={FormInputs.email.length > 0 ? true : false}
            value={FormInputs.email}
            type="email"
            name="email"
            placeholder="Email"
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
            Sign Up
          </Btn>
        </form>
      </div>
    </>
  )
}

export default SignUpPage
