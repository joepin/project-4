import React, { Component } from 'react';
import Login from './Login/Login.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return(
      <div>
        <h1>Hello World!!</h1>
        <Login />
      </div>
    );
  }
}

export default App;
