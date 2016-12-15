import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData || {},
    };
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) browserHistory.push('/register');
  }

  render() {
    return(
      <div>
        <h3>Welcome, {this.state.userData.fname || ''} {this.state.userData.lname || ''}!</h3>
        <p>Your email: {this.state.userData.email || ''}</p>
        <br/>
        <Link to='/run'>Prepare Your Server</Link>
        <br/>
        <Link to='/settings'>Edit Your Settings</Link>
      </div>
    );
  }
}

export default Profile;
