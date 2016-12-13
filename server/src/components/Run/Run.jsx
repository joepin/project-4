import React, { Component } from 'react';
import { Link } from 'react-router';

class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirPath: '',
      serverPort: '',
      buttonText: 'Start Server',
      toggleServer: this.startServer.bind(this),
      webServer: null,
      serverName: this.props.serverName,
    };
  }

  pathChange(e) {
    this.setState({
      dirPath: e.currentTarget.value,
    });
  }

  portChange(e) {
    this.setState({
      serverPort: e.currentTarget.value,
    });
  }

  startServer() {
    const server = this.state.serverModule;
    server.run(console, this.state.serverPort, this.state.dirPath);
    console.log('started your media server!');

    this.setState({
      buttonText: 'Stop Server',
      toggleServer: this.stopServer.bind(this),
    });
  }

  stopServer() {
    const server = this.state.serverModule;
    server.kill();
    console.log('stopped your media server');

    this.setState({
      buttonText: 'Start Server',
      toggleServer: this.startServer.bind(this),
    });
  }

  componentDidMount() {
    const remote = require('electron').remote;
    // const fs = remote.require('fs');
    const server = remote.require('./lib/server.js');
    const settings = remote.require('electron-settings');
    this.setState({
      remote: remote,
      serverModule: server,
      settings: settings,
      serverPort: settings.getSync('publicPort'),
      dirPath: settings.getSync('defaultPath'),
    });
  }

  render() {
    return(
      <div>
        <h1>Hello World!</h1>
        <h4>Welocome to the world's best media streaming server!</h4>
        <label htmlFor="path">Enter a path</label>
        <input type="text" name="path" value={this.state.dirPath} onChange={this.pathChange.bind(this)} />
        <br/>
        <label htmlFor="port">Enter a port:</label>
        <input type="text" name="port" value={this.state.serverPort} onChange={this.portChange.bind(this)} />
        <br/>
        <button onClick={this.state.toggleServer}>{this.state.buttonText}</button>
        <br/>
        <Link to='/profile'>Go to Your Profile</Link>
      </div>
    );
  }
}

export default Run;
