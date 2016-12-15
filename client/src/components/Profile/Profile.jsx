import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';
import ServerList from '../ServerList/ServerList.jsx';

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
    fetch('/api/v1/servers', {
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
      <div>
        <button onClick={() => this.logout()}>Log Out</button>
        <h3>Welcome, {this.state.userData.fname || ''} {this.state.userData.lname || ''}!</h3>
        <p>Your email: {this.state.userData.email || ''}</p>
        <Link to='/files'>See files</Link>
        <ServerList
          servers={this.props.servers}
          updateAppState={this.props.updateOverallState}
        />
      </div>
    );
  }
}

export default Profile;
