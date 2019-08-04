// Imports
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// App Imports

import Root from './root'
import About from './about'
import Home from './home'
import Explore from './explore'

const App = () => (
  <Switch>
    <Route exact path="/" component={Root}/>
    <Route exact path="/home" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path='/explore' component={Explore}/>
  </Switch>
)

export default App
