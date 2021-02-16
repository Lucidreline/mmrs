import React from 'react'
import { NavLink } from 'react-router-dom'

const menu = ({ close }: any) => {
  return (
    <div className="menu">
      <ul>
        <li>
          <NavLink onClick={close} activeClassName="current" to="/map">
            Map
          </NavLink>
        </li>
        <li>
          <NavLink onClick={close} activeClassName="current" to="/adventures">
            Adventures
          </NavLink>
        </li>
        <li>
          <NavLink onClick={close} activeClassName="current" to="/locations">
            Locations
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={close}
            activeClassName="current"
            to="/adventure-form"
          >
            Upload
          </NavLink>
        </li>
        <li>
          <NavLink onClick={close} activeClassName="current" to="/sign-in">
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink onClick={close} activeClassName="current" to="/sign-up">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default menu
