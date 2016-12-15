import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  updateState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  login() {
    fetch('/api/v1/users/login', {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then(r => r.json())
    .then(data => {
      this.props.updateOverallState('userData', data.user_data);
      localStorage.setItem('userAuthToken', data.token);
      localStorage.setItem('tokenReceived', Date.now());
      localStorage.setItem('userData', JSON.stringify(data.user_data));
      browserHistory.push('/profile');
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" value={this.state.email} onChange={(e) => this.updateState('email', e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" value={this.state.password} onChange={(e) => this.updateState('password', e.target.value)} />
        <button onClick={() => this.login()}>Login!</button>
      </div>
    );
  }
}

export default Login;
