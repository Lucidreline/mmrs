import React from 'react'
import './App.scss'

import { Route, Switch, Redirect } from 'react-router-dom'

import MapPage from './components/pages/map-page/map-page.component'
import { LocationPage } from './components/pages/location-page/location-page.component'
import AdventuresPage from './components/pages/adventures-page/adventures-page.component'
import LocationsPage from './components/pages/locations-page/locations-page.component'
import AdventureForm from './components/adventure-form/adventure-form.component'
import AdventurePage from './components/pages/adventure-page/adventure-page.component'
import SignUpPage from './components/pages/sign-up-page/sign-up-page.component'
import SignInPage from './components/pages/sign-in-page/sign-in-page.component'

const App = () => {
  return (
    <div>
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

        <Route exact path="/sign-up" component={SignUpPage} />
        <Route exact path="/sign-in" component={SignInPage} />
      </Switch>
    </div>
  )
}

export default App
