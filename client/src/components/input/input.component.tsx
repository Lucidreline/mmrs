import React from 'react'

import './input.styles.scss'

interface IProps {
  name: string
  placeholder: string
  handleChange: any
  type: string
  [key: string]: any
}

const Input = ({
  type,
  handleChange,
  name,
  placeholder,
  ...otherProps
}: IProps) => {
  const customTextInput = (
    <div className="custom-text-input">
      <input
        {...otherProps}
        onChange={handleChange}
        autoComplete="off"
        type="text"
        name={name}
      />
      <label htmlFor={name}>
        <span>{placeholder}</span>
      </label>
    </div>
  )

  const customNumberInput = (
    <div className="custom-text-input">
      <input
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
    <div className="custom-text-area">
      <textarea {...otherProps} onChange={handleChange} name={name}></textarea>
      <label htmlFor={name}>
        <span>{placeholder}</span>
      </label>
    </div>
  )

  let customInput

  if (type === 'text') {
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
