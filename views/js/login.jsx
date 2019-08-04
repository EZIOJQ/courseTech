import React from "react";
import PropTypes from "prop-types";
import LoginModal from "react-login-modal-sm";
import {Redirect} from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

class Login extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      error: '',
      showModal: false,
      url: "",
      logged: false,
      registered: false
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleLoginWithFacebook = () => {
    // Do something when 'Login with Facebook' is clicked
    alert('Feature Coming Soon')
  };

  handleLoginByEmail = (email, password) => {
    let input = {email: email, password: password};
    fetch('/api/users/login', {
      method: 'post',

      body: JSON.stringify(input),

      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log(response.clone().json())
          return response.json()
        }
      })
      .then(response => {
        if (response.success) {
          const token = response.data.token

          localStorage.setItem('token', token)
        }

        return response
      })

      .then((response) => {
        if (response.success) {
          console.log('success!')
          // Redirect
          setTimeout(() => {
            this.setState({logged: true})
          }, 1000)
        } else {
          this.setState({
            error: response.errors[0].message,
          });
          alert(error)
        }
      })
  }


  handleSignupByEmail = (email, username, password) => {
    let input = {name: username, email: email, password: password};
    fetch('api/users/register', {
      method: 'post',

      body: JSON.stringify(input),

      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((response) => {
      if (response.success) {
        this.setState({
          email: '',
          username: '',
          password: '',
          error: ''
        })

        // Redirect
        setTimeout(() => {
          this.setState({registered: true})
        }, 1000)
      } else {
        this.setState({
          error: response.errors[0].message,
        });
        alert(error)
      }
    })

  }

  handleLoginWithGoogle = (email, username, password) => {
    alert('Feature Coming Soon')
  }

  render() {
    const customUsernameRegex = /^[a-zA-Z0-9_]{5,}/;

    return (
      <div>
      <Router>
        <div className="login-button">
          <LoginModal
            showModal={this.state.showModal}
            toggleModal={this.toggleModal}
            onLoginFacebook={this.handleLoginWithFacebook}
            onSignupEmail={this.handleSignupByEmail}
            usernameRegex={customUsernameRegex}
            onLoginEmail= {this.handleLoginByEmail}
            onLoginGoogle= {this.handleLoginWithGoogle}
          />

          <button
            className="test-btn btn btn-primary btn-lg"
            onClick={this.toggleModal}
          >
            Log in
          </button>
        </div>
        <Route>
        {this.state.logged ?  <Redirect to={{
          pathname: '/home',
          data: {username: this.state.username, email: this.state.email}
          }} /> : ''}
        {this.state.registered ? <Redirect to={{
          pathname: "/home",
          data: {username: this.state.username, email: this.state.email}
          }} /> : ''}
        </Route>
        </Router>
      </div>
    );
  }
}

export default Login

