import React from 'react'

import './btn.styles.scss'

interface IProps {
  children: string
  [key: string]: any
}

const Btn = ({ children, ...otherProps }: IProps) => {
  return (
    <div className="btn-container">
      <button {...otherProps}>{children}</button>
    </div>
  )
}

export default Btn
