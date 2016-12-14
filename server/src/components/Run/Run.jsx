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
      fpError: false,
    };
  }

  updateState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  startServer() {
    const server = this.state.serverModule;
    if (!server.isValidPath(this.state.dirPath)) {
      this.setState({
        fpError: true,
      });
      return;
    }
    server.run(console, this.state.serverPort, this.state.dirPath, this.props.serverUUID);
    this.setState({
      buttonText: 'Stop Server',
      toggleServer: this.stopServer.bind(this),
      isRunning: true,
    });
  }

  stopServer() {
    const server = this.state.serverModule;
    server.kill();
    this.setState({
      buttonText: 'Start Server',
      toggleServer: this.startServer.bind(this),
      isRunning: false,
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

  updatePath(k, v) {
    this.updateState(k, v);
    if (this.state.fpError) this.updateState('fpError', false);
  }

  displayFPError() {
    return (this.state.fpError ? <p>Invalid file path. Check the path and try again.</p> : '')
  }

  displayProfileLink() {
    if (!this.state.isRunning) return <Link to='/profile'>Go to Your Profile</Link>
  }

  render() {
    return(
      <div>
        <h1>Hello World!</h1>
        <h4>Welocome to the world's best media streaming server!</h4>
        <label htmlFor="path">Enter a path</label>
        <input type="text" disabled={this.state.isRunning} name="path" value={this.state.dirPath} onChange={(e) => this.updatePath('dirPath', e.target.value)} />
        {this.displayFPError()}
        <br/>
        <label htmlFor="port">Enter a port:</label>
        <input type="text" disabled={this.state.isRunning} name="port" value={this.state.serverPort} onChange={(e) => this.updateState('serverPort', e.target.value)} />
        <br/>
        <p>This server's name: {this.props.serverName}</p>
        <button onClick={this.state.toggleServer}>{this.state.buttonText}</button>
        <br/>
        {this.displayProfileLink()}
      </div>
    );
  }
}

export default Run;
