import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import ServerList from '../ServerList/ServerList.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData || {},
    };
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) browserHistory.push('/login');

    this.getUserServers();
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

  render() {
    return(
      <div>
        <h1>In Profile</h1>
        <h3>Welcome, {this.state.userData.fname || ''} {this.state.userData.lname || ''}!</h3>
        <p>Your email: {this.state.userData.email || ''}</p>
        <ServerList servers={this.props.servers} />
      </div>
    );
  }
}

export default Profile;
