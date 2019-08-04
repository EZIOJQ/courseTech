// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import jwtDecode from 'jwt-decode'


// App Imports
import { setCurrentUser } from './actions/user'
import App from './app'


// User Authentication
const token = localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
	setCurrentUser(jwtDecode(token))
}

// Render App
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
