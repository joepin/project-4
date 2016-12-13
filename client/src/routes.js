import React, { Component } from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import App from './components/App.jsx';
import Login from './components/Login/Login.jsx';
import Profile from './components/Profile/Profile.jsx';

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute  />
    <Route path='/login' component={Login} />
    <Route path='/profile' component={Profile} />
  </Route>
);
