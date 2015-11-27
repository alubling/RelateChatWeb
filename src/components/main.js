import React from 'react';
import { Router, Route, Link } from 'react-router';
import Dashboard from './dashboard.js';
//import api from '../api/api.js';
import auth from "../utils/firebaseAuthUtils.js"

export default class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loginEmail: '',
      loginPassword: '',
      signupEmail: '',
      signupPassword: '',
      isLoading: false,
      error: false,
      onChange: false
    };
    this.handleChangeToLoginEmail = this.handleChangeToLoginEmail.bind(this);
    this.handleChangeToLoginPassword = this.handleChangeToLoginPassword.bind(this);
    this.handleChangeToSignupEmail = this.handleChangeToSignupEmail.bind(this);
    this.handleChangeToSignupPassword = this.handleChangeToSignupPassword.bind(this);
  }

  handleChangeToLoginEmail(event) {
    this.setState({
      loginEmail: event.target.value
    });
  }

  handleChangeToLoginPassword(event) {
    this.setState({
      loginPassword: event.target.value
    });
  }

  handleChangeToSignupEmail(event) {
    this.setState({
      signupEmail: event.target.value
    });
  }

  handleChangeToSignupPassword(event) {
    this.setState({
      signupPassword: event.target.value
    });
  }

  submitLogin(event){
    event.preventDefault();

     var user = {
       email: this.state.loginEmail,
       password: this.state.loginPassword
     }
     this.setState({
       loginEmail: '',
       loginPassword: ''
     })

    auth.loginWithPW(user, (loggedIn) => {
      let userObj = loggedIn;
      console.log("do we have the uid in our callback for routing to that user's dashboard?", userObj.uid);
      if(!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
          this.context.history.replaceState(null, location.state.nextPathname)
      } else {
          console.log("replaceState dashboard")
          this.context.history.replaceState(null, `/dashboard/${userObj.uid}`)
      }

    })

  }

  submitSignUp(event){
    event.preventDefault();
    var loginObject = {
      email: this.state.signupEmail,
      password: this.state.signupPassword
    }
    this.setState({
      signupEmail: '',
      signupPassword: '',
    })
    auth.createUser(loginObject, (loggedIn) => {
      let userObj = loginObject;
      if(!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
          this.context.history.replaceState(null, location.state.nextPathname)
      } else {
          console.log("replaceState dashboard")
          this.context.history.replaceState(null, `/dashboard/${userObj.uid}`)
      }
    })
  }

// had this before but not necessary?
// <p>Go to the <Link to="/dashboard">Dashboard</Link></p>

  render() {
    return (
        <div style={styles.mainContainer}>
            <div>
                <div label="Login" style={styles.formBox}>
                  <h2>Login</h2>
                  <div style={styles.loginFields}>
                    <h3>Email:</h3>
                    <input
                      type="text"
                      value={this.state.loginEmail}
                      onChange={this.handleChangeToLoginEmail}
                    />
                    <br/>
                    <h3>Password</h3>
                    <input
                      type="password"
                      value={this.state.loginPassword}
                      onChange={this.handleChangeToLoginPassword}
                    />
                    <br />
                    <button onClick={this.submitLogin.bind(this)}>Submit</button>
                    {this.state.error && (<p>Bad login information</p>)}
                  </div>
                </div>
                <div label="Sign Up" style={styles.formBox}>
                  <h2>Sign Up</h2>
                  <div style={styles.loginFields}>
                    <h3>Email:</h3>
                    <input
                      type="text"
                      value={this.state.signupEmail}
                      onChange={this.handleChangeToSignupEmail}
                    />
                    <br/>
                    <h3>Password</h3>
                    <input
                      type="password"
                      value={this.state.signupPassword}
                      onChange={this.handleChangeToSignupPassword}
                    />
                    <br />
                    <button onClick={this.submitSignUp.bind(this)}>Submit</button>
                  </div>
                </div>
            </div>
            {this.props.children || "Welcome to the sightings app"}
        </div>
    )
  }
}

var styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  card: {
    width: '25%'
  },
  formBox: {
    borderStyle: 'solid', // for some reason this is necessary to get anything to display
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
  },
  loginFields: {
    marginLeft: 10,
    marginBottom: 30
  }
};

Main.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
}
