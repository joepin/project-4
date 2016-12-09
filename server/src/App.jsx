import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirPath: '',
      buttonText: 'Start Server',
      webServer: null,
    };
  }

  inputChange(e) {
    console.log(e.currentTarget.value);
    this.setState({
      dirPath: e.currentTarget.value,
    });
  }

  startServer() {
    // const webServer = require('../lib/server.js');
    // webServer.run();
    // this.setState({
    //   buttonText: 'Stop Server',
    //   toggleServer: this.stopServer.bind(this),
    //   webServer: webServer,
    // });
  }

  stopServer() {
    // const webServer = this.state.webServer;
    // webServer.kill();
    // this.setState({
    //   buttonText: 'Start Sewrver',
    //   toggleServer: this.startServer.bind(this),
    //   webServer: null,
    // });
  }

  render() {
    return(
      <div>
        <h1>Hello World!</h1>
        <h4>Welocome to the world's best media streaming server!</h4>
        <input type="text" value={this.state.dirPath} onChange={this.inputChange.bind(this)} />
      </div>
    );
  }
}

export default App;
