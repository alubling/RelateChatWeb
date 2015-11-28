import React from 'react';
import auth from "../utils/firebaseAuthUtils.js"
import { Link } from 'react-router';
import Firebase from 'firebase';

const ref = new Firebase('https://relate-chat.firebaseio.com');

export default class Default extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: auth.isLoggedIn()
    };
  }
  handleLogout(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  }
  // updateAuth(isLoggedIn) {
  //     this.setState({
  //         isLoggedIn: isLoggedIn
  //     })
  // }
  componentWillMount() {
      auth.onChange = this.handleLogout.bind(this);

      // ask Milad what this does
      // auth.onChange = this.updateAuth.bind(this);
      // auth.loginWithPW()
  }
  render() {
    let loginOrOut = "";
    let register = "";
    if (this.state.loggedIn) {
      loginOrOut = <Link to="/logout">Logout</Link>;
      register = null;
    } else {
      loginOrOut = <Link to="/">Login</Link>;
      register = <Link to="/">Sign Up</Link>;
    };
    // <h1 style={styles.center}>Once more unto the breach dear friends to the Relate Chat Web App</h1>
    // <ul>
    //   <li>{register}</li>
    //   <li>{loginOrOut}</li>
    //   <li><Link to="/about">About</Link></li>
    // </ul>
    return (
      <div>
        <div className="ui secondary menu">
          <a className="active item">Home</a>
          <div className="item">
            <Link to="/about">About</Link>
          </div>
          <div className="right menu">
            <div className="item">{register}</div>
            <div className="item">{loginOrOut}</div>
          </div>
        </div>
      {this.props.children}
    </div>
    )
  }
}

// not sure why this was at the top nav? it doesn't actually indicate if a user is authenticated it is there regardless
// <li><Link to="/dashboard">Dashboard</Link>(authenticated) </li>

// ask milad what this does - took it out of the <li> tags
// {this.state.isLoggedIn ?
//   ( <Link to="/logout">Log out</Link> ) :
//   ( <Link to="/">Sign in</Link> )
// }


var styles = {
  center: {
    textAlign: 'center'
  }
}
