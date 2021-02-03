import React from 'react'

import './input.styles.scss'

interface IProps {
  name: string
  placeholder: string
  handleChange: any
  type: string
}

const Input = (props: IProps) => {
  const customTextInput = (
    <div className="custom-text-input">
      <input
        onChange={props.handleChange}
        autoComplete="off"
        type="text"
        name={props.name}
      />
      <label htmlFor={props.name}>
        <span>{props.placeholder}</span>
      </label>
    </div>
  )

  const customNumberInput = (
    <div className="custom-text-input">
      <input
        onChange={props.handleChange}
        autoComplete="off"
        type="number"
        name={props.name}
        step="0.00000001"
      />
      <label htmlFor={props.name}>
        <span>{props.placeholder}</span>
      </label>
    </div>
  )

  const customTextArea = (
    <div className="custom-text-area">
      <textarea onChange={props.handleChange} name={props.name}></textarea>
      <label htmlFor={props.name}>
        <span>{props.placeholder}</span>
      </label>
    </div>
  )

  let customInput

  if (props.type === 'text') {
    customInput = customTextInput
  } else if (props.type === 'textArea') {
    customInput = customTextArea
  } else if (props.type === 'number') {
    customInput = customNumberInput
  } else {
    customInput = <h3>Invalid Input Type</h3>
  }

  return customInput
}

export default Input
