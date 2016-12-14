import React, { Component } from 'react';
import { Link } from 'react-router';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      port: '',
      path: '',
      name: '',
      isDisabled: false,
    };
  }

  componentWillMount() {
    const remote = require('electron').remote;
    const settings = remote.require('electron-settings');
    this.getSettings();
  }

  getSettings() {
    const remote = require('electron').remote;
    const settings = remote.require('electron-settings');
    this.setState({
      port: settings.getSync('publicPort'),
      path: settings.getSync('defaultPath'),
      name: settings.getSync('serverName'),
      isDisabled: false,
    });
  }

  updateState(key, value) {
    // console.log('key:', key, '\n', 'value:', value);
    this.setState({
      [key]: value,
    });
  }

  saveSettings() {
    this.setState({
      isDisabled: true,
    });
    const remote = require('electron').remote;
    const settings = remote.require('electron-settings');
    settings.setSync('publicPort', this.state.port);
    settings.setSync('defaultPath', this.state.path);
    settings.setSync('serverName', this.state.name);
    this.getSettings();
  }

  render() {
    return (
      <div>
        <h5>Welcome to Settings!</h5>
        <label htmlFor="port">Enter a default port:</label>
        <input type="text" name="port" value={this.state.port || ''} onChange={(e) => this.updateState('port', e.target.value)} />
        <br/>
        <label htmlFor="path">Enter a default file path:</label>
        <input type="text" name="path" value={this.state.path || ''} onChange={(e) => this.updateState('path', e.target.value)} />
        <br/>
        <label htmlFor="name">Enter a default server name:</label>
        <input type="text" name="name" value={this.state.name || ''} onChange={(e) => this.updateState('name', e.target.value)} />
        <br/>
        <button disabled={this.state.isDisabled} onClick={() => this.saveSettings()} >Save</button>
        <br/>
        <Link to='/profile'>Go to Your Profile</Link>
      </div>
    )
  }
}

export default Settings;
