import React, { useState } from 'react'
import Input from '../../input/input.component'

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

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    SetFormInputs((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  return (
    <div className="sign-up-page">
      <h2 className="page-title">Sign Up</h2>
      <form className="sign-in-form">
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
      </form>
    </div>
  )
}

export default SignUpPage
