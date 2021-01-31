import React from 'react'
import './App.scss'

import { Route, Switch, Redirect } from 'react-router-dom'

import MapPage from './components/pages/map-page/map-page.component'
import { LocationPage } from './components/pages/location-page/location-page.component'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/map" />
        </Route>

        <Route exact path="/map" component={MapPage} />
        <Route path="/location" component={LocationPage} />
      </Switch>
    </div>
  )
}

export default App
