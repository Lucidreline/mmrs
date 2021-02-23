import axios from 'axios'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { IUser } from '../../utils/types'

interface IProps {
  close: any
  currentUser?: IUser
}

const Menu = ({ close, currentUser }: IProps) => {
  const history = useHistory()
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
          <li
            onClick={async () => {
              await axios
                .post(`${process.env.REACT_APP_API_ORIGIN}/api/users/log-out`)
                .then(() => {
                  history.push('/sign-in')
                  //close()
                })
            }}
          >
            Log Out
          </li>
        )}
      </ul>
    </div>
  )
}

export default Menu
