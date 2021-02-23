import React from 'react'
import GuestSignInMessage from '../../guest-signed-in-message/guest-sign-in-message.component'
import Header from '../../header/header.component'

import Map from '../../map/map.component'

const MapPage = () => (
  <>
    <Header />
    <div>
      <GuestSignInMessage marginBottom />
      <Map />
    </div>
  </>
)

export default MapPage
