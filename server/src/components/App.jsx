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
    const uuid = settings.getSync('serverUUID');
    const mac = settings.getSync('serverMac');
    const name = settings.getSync('serverName');
    const user = settings.getSync('userData');
    // console.log('serverUUID:', uuid);
    // console.log('serverMac:', mac);
    // console.log('user:', user);
    this.setState({
      serverUUID: uuid,
      serverMac: mac,
      serverName: name,
      userData: user,
      isLoggedIn: !!uuid,
    });
    browserHistory.push(uuid ? '/profile' : '/register');
  }

  updateState(key, value) {
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
          serverMac: this.state.serverMac,
          serverName: this.state.serverName,
        })
        }
      </div>
    );
  }
}

export default App;
