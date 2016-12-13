import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: {},
      servers: [],
    };
  }

  componentWillMount() {
    browserHistory.push(this.state.isLoggedIn ? '/profile' : '/login');
  }

  updateState(key, value) {
    // console.log('key:', key, '\n', 'value:', value);
    this.setState({
      [key]: value,
    });
  }

  render() {
    return(

      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          updateOverallState: (k, v) => this.updateState(k, v),
          isLoggedIn: this.state.isLoggedIn,
          userData: this.state.userData,
          servers: this.state.servers,
        })
        }
      </div>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div><h1>Hello World! (Again)</h1></div>
//     );
//   }
// }

export default App;
