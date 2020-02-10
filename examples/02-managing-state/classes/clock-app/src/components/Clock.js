import React, { Component } from 'react';

class Clock extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentTime: new Date().toLocaleString()
  //   };
  // }

  constructor() {
    super();
    this.launchClock();
  }

  state = {
    currentTime: new Date().toLocaleString()
  };

  launchClock() {
    setInterval(() => {
      // console.log('Updating time...');
      this.setState({
        currentTime: new Date().toLocaleString()
      });
    }, 1000);
  }

  render() {
    return <div>{this.state.currentTime}</div>;
  }
}

export default Clock;
