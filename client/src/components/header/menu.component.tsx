import React from 'react'
import { NavLink } from 'react-router-dom'
import { IUser } from '../../utils/types'

interface IProps {
  close: any
  currentUser?: IUser
}

const menu = ({ close, currentUser }: IProps) => {
  return (
    <div className="menu">
      <ul>
        {currentUser ? (
          <li id="menu-username">
            {currentUser.username}
            <hr className="username-divider"></hr>
          </li>
        ) : null}

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
        {currentUser?.username === 'Guest' ? (
          <>
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
          </>
        ) : (
          <li>
            <NavLink
              onClick={() => {
                //log out here
                close()
              }}
              activeClassName="current"
              to="/sign-in"
            >
              Log Out
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}

export default menu
