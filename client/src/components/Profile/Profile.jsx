import React, {Component} from 'react';
import { browserHistory } from 'react-router';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user_data: this.props.user_data || {},
    };
  }

  componentWillMount() {
    if (!this.state.isLoggedIn) browserHistory.push('/')
  }

  render() {
    return(
      <div>
        <h1>In Profile</h1>
        <h3>Welcome, {this.state.user_data.fname || ''} {this.state.user_data.lname || ''}!</h3>
        <p>Your email: {this.state.user_data.email || ''}</p>
      </div>
    );
  }
}

export default Profile;
