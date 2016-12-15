import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styles from './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  updateState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  signup() {
    fetch('/api/v1/users/', {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
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
      <div className={styles['main-container']}>
        <div className={styles['input-container']}>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" value={this.state.firstName} onChange={(e) => this.updateState('firstName', e.target.value)} />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" value={this.state.lastName} onChange={(e) => this.updateState('lastName', e.target.value)} />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="email">Email:</label>
          <input type="text" value={this.state.email} onChange={(e) => this.updateState('email', e.target.value)} />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="password">Password:</label>
          <input type="password" value={this.state.password} onChange={(e) => this.updateState('password', e.target.value)} />
        </div>
        <button className={styles['submit-button']} onClick={() => this.signup()}>Sign Up!</button>
      </div>
    );
  }
}

export default Signup;
