import React from 'react'
import './App.scss'

import { Route, Switch, Redirect } from 'react-router-dom'

import MapPage from './components/pages/map-page/map-page.component'
import { LocationPage } from './components/pages/location-page/location-page.component'
import AdventuresPage from './components/pages/adventures-page/adventures-page.component'
import LocationsPage from './components/pages/locations-page/locations-page.component'
import Header from './components/header/header.component'
import AdventureForm from './components/adventure-form/adventure-form.component'
import AdventurePage from './components/pages/adventure-page/adventure-page.component'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/map" />
        </Route>
        <Route path="/map" component={MapPage} />

        <Route exact path="/adventures" component={AdventuresPage} />
        <Route path="/adventure" component={AdventurePage} />
        <Route path="/adventure-form" component={AdventureForm} />

        <Route path="/location" component={LocationPage} />
        <Route exact path="/locations" component={LocationsPage} />
      </Switch>
    </div>
  )
}

export default App
