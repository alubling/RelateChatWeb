import React from 'react';
import { Router, Route, Link } from 'react-router';

export default class UserMessages extends React.Component {
  render() {
    return (
      <div>
        <h3>Conversation with {this.props.user.name}:</h3>
      </div>
    )
  }
}

UserList.propTypes = {
  user: React.propTypes.object.isRequred,
  messages: React.propTypes.array.isRequired
}
