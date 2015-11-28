import React from 'react';
import { Router, Route, Link } from 'react-router';

import ListItems from './listitems.js';

export default class UserList extends React.Component {
  // figure out how to use react list to make this list scrollable and uniform - https://github.com/orgsync/react-list
  // <h3 className="ui header">This is the list of users</h3>
  render() {
    console.log("this is the userlist component, are we getting the users:", this.props.users);
    return (
        <ListItems users={this.props.users} onUserSelect={this.props.onUserSelect} />
    )
  }
}

// UserList.propTypes = {
//   users: React.propTypes.array.isRequired,
//   onUserSelect: React.propTypes.function.isRequired
// }
