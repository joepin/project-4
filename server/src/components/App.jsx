import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: {},
      servers: [],
      serverUUID: null,
    };
  }

  componentWillMount() {
    const remote = require('electron').remote;
    const settings = remote.require('electron-settings');
    const token = settings.getSync('serverAuthToken');
    const uuid = settings.getSync('serverUUID');
    console.log('serverUUID:', uuid);
    console.log('serverAuthToken:', token);
    this.setState({
      serverUUID: uuid,
      serverAuthToken: token,
    });
    browserHistory.push(token ? '/profile' : '/login');
  }

  componentDidMount() {
    const remote = require('electron').remote;
    const settings = remote.require('electron-settings');
    const { getMac } = remote.require('getmac');
    getMac((err, mac) => console.log('getMac', err ? err : mac));
  }

  componentWillUnmount() {
    localStorage.removeItem('userAuthToken');
  }

  updateState(key, value) {
    // console.log('key:', key, '\n', 'value:', value);
    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          updateOverallState: (k, v) => this.updateState(k, v),
          isLoggedIn: this.state.isLoggedIn,
          userData: this.state.userData,
          servers: this.state.servers,
          serverUUID: this.state.serverUUID,
          serverAuthToken: this.state.serverAuthToken,
        })
        }
      </div>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div><h1>Hello World! (Again)</h1></div>
//     );
//   }
// }

export default App;
