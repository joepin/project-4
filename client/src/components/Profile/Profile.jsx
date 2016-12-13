import React, {Component} from 'react';
import { browserHistory } from 'react-router';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData || {},
    };
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) browserHistory.push('/')
  }

  render() {
    return(
      <div>
        <h1>In Profile</h1>
        <h3>Welcome, {this.state.userData.fname || ''} {this.state.userData.lname || ''}!</h3>
        <p>Your email: {this.state.userData.email || ''}</p>
      </div>
    );
  }
}

export default Profile;
