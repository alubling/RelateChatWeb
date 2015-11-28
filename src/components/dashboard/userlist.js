import React from 'react';
import { Router, Route, Link } from 'react-router';

import ListItems from './listitems.js';

export default class UserList extends React.Component {
  // figure out how to use react list to make this list scrollable and uniform - https://github.com/orgsync/react-list
  render() {
    console.log("this is the userlist component, are we getting the users:", this.props.users);
    return (
      <div>
        <h3>This is the list of users</h3>
        <ListItems users={this.props.users} />
      </div>
    )
  }
}

// UserList.propTypes = {
//   users: React.propTypes.array.isRequired
// }
