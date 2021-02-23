import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Popup from 'reactjs-popup'
import BurgerIcon from './burger-icon.component'
import Menu from './menu.component'

import './header.styles.scss'
import { IUser } from '../../utils/types'
import fetchCurrentUser from '../../utils/fetch-current-user'
import axios from 'axios'

const contentStyle = {
  background: 'rgba(255,255,255,0)',
  width: '80%',
  border: 'none',
}

const Header = () => {
  const [currentUser, setcurrentUser] = useState<IUser>()

  useEffect(() => {
    const initCurrentUser = async () => {
      const currentUser = await fetchCurrentUser()
      setcurrentUser(currentUser)
    }
    initCurrentUser()
  }, [])

  return (
    <nav id="nav-bar" className="container">
      <div className="logo-container">
        <Link to="/">
          <h1 className="logo">mmrs</h1>
        </Link>
      </div>
      <div className="links-container">
        <div className="hamberger-container">
          <div>
            <Popup
              modal
              overlayStyle={{ background: 'rgba(255,255,255,0.98' }}
              contentStyle={contentStyle}
              closeOnDocumentClick={false}
              trigger={(open) => {
                return <BurgerIcon open={open} />
              }}
            >
              {(close: any) => <Menu close={close} currentUser={currentUser} />}
            </Popup>

            <hr />
          </div>
        </div>
      </div>
    </nav>
  )
}

// const oldNav = (
//   <nav id="nav-bar" className="container">
//     <div className="logo-container">
//       <h1 className="logo">mmrs</h1>
//     </div>
//     <div className="links-container">
//       <Link to={`/map/goto/${coordinatesStr}`} className="header-link">
//         Map
//       </Link>
//       <Link to="/adventures" className="header-link">
//         Adventures
//       </Link>
//       <Link to="/locations" className="header-link">
//         Locations
//       </Link>
//       <Link to="/adventure-form" className="header-link">
//         Upload
//       </Link>
//     </div>
//   </nav>
// )

export default Header
