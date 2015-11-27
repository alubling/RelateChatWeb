import React from 'react';
import { Router, Route, Link } from 'react-router';

// dashboard components
import Canned from './dashboard/canned.js';
import Notes from './dashboard/notes.js';
import UserList from './dashboard/userlist.js';
import UserMessages from './dashboard/usermessages.js';

export default class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      relaterUid: this.props.params.relaterId, // get the relater's uid based on the url
      relater: {},
      users: [],
      selectedUserObj: {},
      allMessages: [],
      userMessages: [],
      isLoading: false,
      error: false,
    };
    this.onUserSelect = this.onUserSelect.bind(this);
    console.log("lets make sure we have the relater uid through the params:", this.state.relaterUid);
  }
  onUserSelect(userObj) {
    // this is a click handler in the userlist component that will select the specific user, find their message history on state, and deliver it to the UserMessages component by resetting the state
      // to use this, pass it to the userlist and bind it to an onClick event
    console.log("make sure we have the user that we just selected:", userObj);
    // get this users messages from this.state.allMessages
    // set this.state.userMessages to only those messages
    // set userObj to this.state.selectedUserObj so it can be sent to the messages component

  }
  render() {
    return (
      <div>
        <h1>This is the dashboard for {this.state.relaterUid}</h1>
        <div>
          <UserList users={this.state.users} onUserSelect={this.onUserSelect}/>
        </div>
        <div>
          <UserMessages user={this.state.selectedUserObj} messages={this.state.userMessages}/>
        </div>
      </div>
    )
  }
}
