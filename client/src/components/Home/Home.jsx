import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to cloudMe!</h1>
        <br/>
        <Link to='/login'>Login</Link>
        <br/>
        <Link to='/signup'>Sign Up</Link>
        <br/>
        <Link to='/profile'>Profile</Link>
      </div>
    )
  }
}

export default Home
