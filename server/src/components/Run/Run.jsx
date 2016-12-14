import React, { Component } from 'react';
import { Link } from 'react-router';

class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirPath: '',
      serverPort: '',
      serverName: this.props.serverName,
      buttonText: 'Start Server',
      toggleServer: this.startServer.bind(this),
      webServer: null,
    };
  }

  updateState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  startServer() {
    const server = this.state.serverModule;
    server.run(console, this.state.serverPort, this.state.dirPath);
    this.setState({
      buttonText: 'Stop Server',
      toggleServer: this.stopServer.bind(this),
    });
  }

  stopServer() {
    const server = this.state.serverModule;
    server.kill();
    this.setState({
      buttonText: 'Start Server',
      toggleServer: this.startServer.bind(this),
    });
  }

  componentDidMount() {
    const remote = require('electron').remote;
    const server = remote.require('./lib/server.js');
    const settings = remote.require('electron-settings');
    this.setState({
      serverModule: server,
      serverPort: settings.getSync('publicPort'),
      dirPath: settings.getSync('defaultPath'),
      serverName: settings.getSync('serverName'),
    });
  }

  render() {
    return(
      <div>
        <h1>Hello World!</h1>
        <h4>Welocome to the world's best media streaming server!</h4>
        <label htmlFor="path">Enter a path</label>
        <input type="text" name="path" value={this.state.dirPath} onChange={(e) => this.updateState('dirPath', e.target.value)} />
        <br/>
        <label htmlFor="port">Enter a port:</label>
        <input type="text" name="port" value={this.state.serverPort} onChange={(e) => this.updateState('serverPort', e.target.value)} />
        <br/>
        <button onClick={this.state.toggleServer}>{this.state.buttonText}</button>
        <br/>
        <Link to='/profile'>Go to Your Profile</Link>
      </div>
    );
  }
}

export default Run;
