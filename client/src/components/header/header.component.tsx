import React from 'react'
import { Link } from 'react-router-dom'

import './header.styles.scss'

const Header = () => {
  return (
    <nav id="nav-bar" className="container">
      <div className="logo-container">
        <h1 className="logo">mmrs</h1>
      </div>
      <div className="links-container">
        <Link to="/map" className="header-link">
          Map
        </Link>
        <Link to="/adventures" className="header-link">
          Adventures
        </Link>
        <Link to="/locations" className="header-link">
          Locations
        </Link>
        <Link to="/adventure-form" className="header-link">
          Upload
        </Link>
      </div>
    </nav>
  )
}

export default Header
