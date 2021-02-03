import React from 'react'
import './App.scss'

import { Route, Switch, Redirect } from 'react-router-dom'

import MapPage from './components/pages/map-page/map-page.component'
import { LocationPage } from './components/pages/location-page/location-page.component'
import AdventuresPage from './components/pages/adventures-page/adventures-page.component'
import LocationsPage from './components/pages/locations-page/locations-page.component'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/map" />
        </Route>

        <Route exact path="/map" component={MapPage} />
        <Route path="/location" component={LocationPage} />
        <Route exact path="/adventures" component={AdventuresPage} />
        <Route exact path="/locations" component={LocationsPage} />
      </Switch>
    </div>
  )
}

export default App
