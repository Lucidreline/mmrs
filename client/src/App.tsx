import React from 'react'
import './App.scss'

import { Route, Switch, Redirect } from 'react-router-dom'

import AdventuresPage from './components/pages/adventures-page/adventures-page.component'

import MapPage from './components/pages/map-page/map-page.component'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/map" />
        </Route>

        <Route exact path="/map" component={MapPage} />
        <Route exact path="/adventures" component={AdventuresPage} />
      </Switch>
    </div>
  )
}

export default App
