import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirPath: '/Users/joey/code/wdi/projects/project-4/server/files',
      serverPort: 3000,
      buttonText: 'Start Server',
      toggleServer: this.startServer.bind(this),
      webServer: null,
    };
  }

  pathChange(e) {
    console.log(e.currentTarget.value);
    this.setState({
      dirPath: e.currentTarget.value,
    });
  }

  portChange(e) {
    console.log(e.currentTarget.value);
    this.setState({
      serverPort: e.currentTarget.value,
    });
  }

  startServer() {
    const server = this.state.serverModule;
    server.run(console, this.state.serverPort, this.state.dirPath);
    console.log('starting server');

    this.setState({
      buttonText: 'Stop Server',
      toggleServer: this.stopServer.bind(this),
    });
  }

  stopServer() {
    const server = this.state.serverModule;
    server.kill();
    console.log('stopping server');

    this.setState({
      buttonText: 'Start Server',
      toggleServer: this.startServer.bind(this),
    });
  }

  componentDidMount() {
    const remote = require('electron').remote;
    // const fs = remote.require('fs');
    const server = remote.require('./lib/server.js');
    this.setState({
      remote: remote,
      serverModule: server,
    });
  }

  render() {
    return(
      <div>
        <h1>Hello World!</h1>
        <h4>Welocome to the world's best media streaming server!</h4>
        <input type="text" value={this.state.dirPath} onChange={this.pathChange.bind(this)} />
        <input type="text" value={this.state.serverPort} onChange={this.portChange.bind(this)} />
        <button onClick={this.state.toggleServer}>{this.state.buttonText}</button>
      </div>
    );
  }
}

export default App;
