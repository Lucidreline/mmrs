import React from 'react'

import './btn.styles.scss'

interface IProps {
  children: string
  size: string
  [key: string]: any
}

const Btn = ({ children, size, ...otherProps }: IProps) => {
  return (
    <div className={'btn-container'}>
      <button className={size} {...otherProps}>
        {children}
      </button>
    </div>
  )
}

export default Btn
