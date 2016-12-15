import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Login from './Login/Login.jsx';
import styles from './App.css';
import './styles.global.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: {},
      servers: [],
      activeServer: {},
    };
  }

  componentWillMount() {
    // get the token and token timestamp from localStorage
    const token = localStorage.getItem('userAuthToken');
    const startTime = localStorage.getItem('tokenReceived');
    // check that the token exists and that it was generated within the last 4 hours (which is the
    // expiry time of the token, as defined by the server in the JWT.sign method - see ../../lib/auth.js)
    if (token && (Date.now() - startTime <= 14400000)) {
      // if we're logged in, then we should have user data in localStorage, so get it and store it in state
      const userData = JSON.parse(localStorage.getItem('userData'));
      this.updateState('userData', userData);
      this.updateState('isLoggedIn', true);
      // redirect the user to their profile
      browserHistory.push('/profile');
    } else {
      // if not, then clear all of localStorage just in case
      localStorage.clear();
      // redirect the user to the home page
      browserHistory.push('/');
    }
  }

  updateState(key, value) {
    // console.log('key:', key, '\n', 'value:', value);
    this.setState({
      [key]: value,
    });
  }

  render() {
    return(

      <div className={styles['main-container']}>
        {this.props.children && React.cloneElement(this.props.children, {
          updateOverallState: (k, v) => this.updateState(k, v),
          isLoggedIn: this.state.isLoggedIn,
          userData: this.state.userData,
          servers: this.state.servers,
          activeServer: this.state.activeServer,
        })
        }
      </div>
    );
  }
}

export default App;
