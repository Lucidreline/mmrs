import React from 'react'
import { Link } from 'react-router-dom'

import Popup from 'reactjs-popup'
import BurgerIcon from './burger-icon.component'
import Menu from './menu.component'

import './header.styles.scss'

let coordinatesStr: string
if (
  process.env.REACT_APP_DEFAULT_LAT !== undefined &&
  process.env.REACT_APP_DEFAULT_LON !== undefined
) {
  coordinatesStr = `${process.env.REACT_APP_DEFAULT_LAT},${process.env.REACT_APP_DEFAULT_LON}`
} else {
  coordinatesStr = '34.8,-118.2436849'
}

const contentStyle = {
  background: 'rgba(255,255,255,0)',
  width: '80%',
  border: 'none',
}

const Header = () => {
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
              trigger={(open) => <BurgerIcon open={open} />}
            >
              {(close: any) => <Menu close={close} />}
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
