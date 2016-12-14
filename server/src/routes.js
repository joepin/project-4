import React, { Component } from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import App from './components/App.jsx';
import Register from './components/Register/Register.jsx';
import Profile from './components/Profile/Profile.jsx';
import Run from './components/Run/Run.jsx';
import Settings from './components/Settings/Settings.jsx';

module.exports = (
  <Route path='/' component={App}>
    <Route path='/register' component={Register} />
    <Route path='/profile' component={Profile} />
    <Route path='/run' component={Run} />
    <Route path='/settings' component={Settings} />
  </Route>
);


