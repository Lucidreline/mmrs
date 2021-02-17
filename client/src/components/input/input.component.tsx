import React from 'react'

import './input.styles.scss'

interface IProps {
  name: string
  placeholder: string
  handleChange: any
  type: string
  activated: boolean
  [key: string]: any
}

const Input = ({
  type,
  handleChange,
  name,
  placeholder,
  activated,
  ...otherProps
}: IProps) => {
  const customTextInput = (
    <div className={'custom-text-input'}>
      <input
        className={`${activated ? 'activate' : null}`}
        {...otherProps}
        onChange={handleChange}
        autoComplete="off"
        type={type}
        name={name}
      />
      <label htmlFor={name}>
        <span>{placeholder}</span>
      </label>
    </div>
  )

  const customNumberInput = (
    <div className={'custom-text-input'}>
      <input
        className={`${activated ? 'activate' : null}`}
        {...otherProps}
        onChange={handleChange}
        autoComplete="off"
        type="number"
        name={name}
        step="0.00000001"
      />
      <label htmlFor={name}>
        <span>{placeholder}</span>
      </label>
    </div>
  )

  const customTextArea = (
    <div className={'custom-text-area'}>
      <textarea
        className={`${activated ? 'activate' : null}`}
        {...otherProps}
        onChange={handleChange}
        name={name}
      ></textarea>
      <label htmlFor={name}>
        <span>{placeholder}</span>
      </label>
    </div>
  )

  let customInput

  if (['text', 'password', 'email'].includes(type)) {
    customInput = customTextInput
  } else if (type === 'textArea') {
    customInput = customTextArea
  } else if (type === 'number') {
    customInput = customNumberInput
  } else {
    customInput = <h3>Invalid Input Type</h3>
  }

  return customInput
}

export default Input
