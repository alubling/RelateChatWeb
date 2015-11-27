import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, History } from 'react-router'; // use IndexRoute if you want something OTHER than main to render on the "/" route
import { createHistory, useBasename } from 'history';

import Main from './components/main.js';
import auth from "./utils/firebaseAuthUtils.js";
import Dashboard from './components/dashboard.js';
import Default from './components/default.js';
import Logout from './components/logout.js';
import About from './components/about.js';


const history = useBasename(createHistory)({
    basename: '/'
})

function requireAuth(nextState, replaceState) {
    if(!auth.isLoggedIn())
        replaceState({ nextPathname: nextState.location.pathname}, '/')
}

// testing the router as the main render
ReactDOM.render((
  <Router>
    <Route path="/" component={Default}>
      <IndexRoute component={Main}/>
        <Route name="logout" path="/logout" component={Logout} />
        <Route name="about" path="/about" component={About} />
        <Route name="dashboard" path="/dashboard" component={Dashboard} onEnter={requireAuth}/>
    </Route>
  </Router>
), document.getElementById('app'));
