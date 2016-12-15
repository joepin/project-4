import React, { Component } from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import App from './components/App.jsx';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home.jsx';
import Signup from './components/Signup/Signup.jsx';
import Profile from './components/Profile/Profile.jsx';
import FileList from './components/FileList/FileList.jsx';

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/profile' component={Profile} />
    <Route path='/files' component={FileList} />
  </Route>
);
