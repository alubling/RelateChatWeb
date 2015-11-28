import React from 'react';
import { Router, Route, Link } from 'react-router';
import Firebase from 'firebase';
import Rebase from 're-base';
import FireProof from 'fireproof';
import jQuery from 'jquery';

// dashboard components
import Canned from './dashboard/canned.js';
import Notes from './dashboard/notes.js';
import UserList from './dashboard/userlist.js';
import UserMessages from './dashboard/usermessages.js';

// dashboard helpers
// import DashData from '../utils/dashboardUtils.js';

// Rebase endpoint
const base = Rebase.createClass('https://relate-chat.firebaseio.com/');

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
      messageBindings: [],
      loaded: false,
      error: false,
    };
    this.onUserSelect = this.onUserSelect.bind(this);
    console.log("lets make sure we have the relater uid through the params:", this.state.relaterUid);
  }
  init() {
    let that = this;
    this.ref = base.bindToState(`relaters/${this.state.relaterUid}/users`, {
      context: this,
      asArray: true,
      state: 'users',
      then() {
        console.log("let's make sure the users binded correctly:", this.state.users);
        that.state.users.forEach((item, index) => {
          console.log("this is the item, make sure it's just an id:", item);
          this.state.messageBindings.push(base.bindToState(`messages/${item}`, {
              context: that,
              asArray: true,
              state: `${item}`
          }))
        });
      }
    });

  }
  componentDidMount() {
    // provide the dimmer for the loader to work, both in Semantic UI
    console.log(jQuery);
    //jQuery('.ui.active.dimmer').dimmer('show');
    // setTimeout method with isLoading screen while the data loads or maybe no setTimeout since it's based on time just reset this.setState once the data is in?
    setTimeout(
      () => {
        this.setState({ loaded: true })
      },
      2000
    );
    // define the functions and helpers in a different file and call the functions here to get the data
    // this.ref = new Firebase('https://relate-chat.firebaseio.com');
    // let usersEndpoint = this.ref.child('relaters').child(this.state.relaterUid);
    // bind the data to the right state
    this.init();

  }
  componentWillUnmount() {
    // undo the rebase bindings
    base.removeBinding(this.ref);
    this.state.messageBindings.forEach((item, index) => {
      base.removeBinding(item);
    });
  }
  componentWillReceiveProps() {
    base.removeBinding(this.ref);
    this.state.messageBindings.forEach((item, index) => {
      base.removeBinding(item);
    });
    this.init();
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
    if (!this.state.loaded) {
      return (
        this.renderLoading()
      )
    }
    return (
      <div>
        <h1>This is the dashboard for {this.state.relaterUid}</h1>
        <div>
          <UserList users={this.state.users} onUserSelect={this.onUserSelect}/>
        </div>
        <div>

        </div>
      </div>
    )
  }
  // need to figure out how to not render this UNLESS someone clicks, probably putting it in the clickhandler and then returing it or not
  // <UserMessages user={this.state.selectedUserObj} messages={this.state.userMessages}/>
  renderLoading() {
    return (
      <div>
        <div className="ui active dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      </div>
    )
  }
}
