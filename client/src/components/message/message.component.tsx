import React from 'react'

import './message.styles.scss'

interface IProps {
  msg: string
  status: string
}

const Message = ({ msg, status }: IProps) => {
  let whatToRender =
    msg.length > 0 ? (
      <span className={`message ${status ? status : null}`}>{msg}</span>
    ) : null

  return whatToRender
}

export default Message
