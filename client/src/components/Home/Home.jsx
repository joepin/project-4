import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  // showLinks() {
  //   if (this.props.isLoggedIn) {
  //     return (
  //       <div>
  //         <Link to='/profile'>Profile</Link>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <Link to='/login'>Login</Link>
  //         <Link to='/signup'>Sign Up</Link>
  //       </div>
  //     );
  //   }
  // }

  render() {
    return (
      <div className={styles['main-container']}>
        <h1 className={styles['main-title']}>Welcome to cloudMe!</h1>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign Up</Link>
      </div>
    )
  }
}

export default Home
