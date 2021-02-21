import React from 'react'

import './message.styles.scss'

interface IProps extends IStyles {
  msg: string
  status: string
}

export interface IStyles {
  marginTop?: boolean
  marginBottom?: boolean
}

const Message = ({ msg, status, marginTop, marginBottom }: IProps) => {
  let whatToRender =
    msg.length > 0 ? (
      <span
        className={`message ${status ? status : null} ${
          marginTop ? 'margin-top' : ''
        } ${marginBottom ? 'margin-bottom' : ''}`}
      >
        {msg}
      </span>
    ) : null

  return whatToRender
}

export default Message
