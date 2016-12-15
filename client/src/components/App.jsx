import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Login from './Login/Login.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      servers: [],
    };
  }

  componentWillMount() {
    const token = localStorage.getItem('userAuthToken');
    const startTime = localStorage.getItem('tokenReceived');
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.updateState('userData', userData);
    browserHistory.push((token && (Date.now() - startTime <= 14400000)) ? '/profile' : '/login');
  }

  updateState(key, value) {
    // console.log('key:', key, '\n', 'value:', value);
    this.setState({
      [key]: value,
    });
  }

  render() {
    return(

      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          updateOverallState: (k, v) => this.updateState(k, v),
          userData: this.state.userData,
          servers: this.state.servers,
        })
        }
      </div>
    );
  }
}

export default App;
