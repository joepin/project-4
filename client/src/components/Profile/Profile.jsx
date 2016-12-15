import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';
import ServerList from '../ServerList/ServerList.jsx';
import styles from './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData || {},
    };
  }

  componentWillMount() {
    const token = localStorage.getItem('userAuthToken');
    const startTime = localStorage.getItem('tokenReceived');
    if (!(token || (Date.now() - startTime <= 14400000))) browserHistory.push('/');
    else this.getUserServers();
  }

  getUserServers() {
    fetch('/api/v1/users/servers', {
      headers: new Headers({
        'Token_Authorization': localStorage.getItem('userAuthToken'),
      })
    })
    .then(r => r.json())
    .then(servers => {
      this.props.updateOverallState('servers', servers);
    })
  }

  logout() {
    this.props.updateOverallState('userData', {});
    localStorage.removeItem('userAuthToken');
    localStorage.removeItem('tokenReceived');
    localStorage.removeItem('userData');
    browserHistory.push('/login');
  }

  render() {
    return(
      <div className={styles['wrapper']}>

      <nav className={styles['nav-links']}>
        <p className={styles['email']}>{this.state.userData.email || ''}</p>
        <p className={styles['logout']} onClick={() => this.logout()}>Log Out</p>
      </nav>
      <div className={styles['main-container']}>
        <h3 className={styles['welcome-message']}>Welcome, {this.state.userData.fname || ''} {this.state.userData.lname || ''}!</h3>
        <ServerList
          servers={this.props.servers}
          updateAppState={this.props.updateOverallState}
        />
      </div>
      </div>
    );
  }
}

export default Profile;
        // <Link to='/files' className={styles['link']}>See files</Link>
