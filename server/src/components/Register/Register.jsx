import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: props.serverName,
    };
  }

  updateState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  prepareForLogin() {
    if (!this.props.serverUUID) {
      browserHistory.push('/settings')
    }
  }

  register() {
    const bodyObj = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      mac: this.props.serverMac,
    };

    fetch('http://cloudme.herokuapp.com/api/v1/servers/register', {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      body: JSON.stringify(bodyObj),
    })
    .then(r => r.json())
    .then(data => {
      const remote = require('electron').remote;
      const settings = remote.require('electron-settings');

      this.props.updateOverallState('isLoggedIn', true);
      this.props.updateOverallState('userData', data.user_data);
      this.props.updateOverallState('serverUUID', data.server_data.server_uuid)

      settings.setSync('serverUUID', data.server_data.server_uuid);
      settings.setSync('userData', data.user_data);

      browserHistory.push('/profile');
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" value={this.state.email} onChange={(e) => this.updateState('email', e.target.value)} />
        <br/>
        <label htmlFor="password">Password:</label>
        <input type="password" value={this.state.password} onChange={(e) => this.updateState('password', e.target.value)} />
        <br/>
        <label htmlFor="name">Server Name:</label>
        <input type="name" value={this.state.name} onChange={(e) => this.updateState('name', e.target.value)} />
        <br/>
        <button onClick={() => this.register()}>Login!</button>
      </div>
    );
  }
}

export default Register;
