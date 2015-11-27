import React from 'react';
import { Router, Route, Link } from 'react-router';
import auth from "../utils/firebaseAuthUtils.js"

export default class Logout extends React.Component {
    componentDidMount() {
        auth.logout();
        setTimeout(
          () => {
            console.log("this is the context:", this.context);
            this.context.history.replaceState(null, '/')
          },
          1500
        );
    }
    render() {
      return (
          <div>
              <p>You are now logged out</p>
          </div>
      )

    }
}

// this is an alternative to using the mixin for [Router.Navigation] to get this.transitionTo method.
Logout.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
}
