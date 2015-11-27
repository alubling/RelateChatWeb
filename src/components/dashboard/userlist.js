import React from 'react';
import { Router, Route, Link } from 'react-router';

import ListItems from './listitems.js';

export default class UserList extends React.Component {
  renderList() {

  }
  render() {
    return (
      <div>
        <h3>This is the list of users</h3>
        <ListItems users={this.props.users} />
      </div>
    )
  }
}

UserList.propTypes = {
  users: React.propTypes.array.isRequired
}
