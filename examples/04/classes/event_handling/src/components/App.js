import React, { Component } from 'react';
import Button from './Button';
import Sign from './Sign';
import signs from '../js/signs.js';

class App extends Component {
  state = {
    signs: []
  };

  loadSigns = () => {
    this.setState({ signs });
  };

  render() {
    return (
      <>
        <Button myMessage="hello world!" loadSigns={this.loadSigns} />
        <ul className="signs">
          {Object.keys(this.state.signs).map(key => (
            <Sign key={key} details={this.state.signs[key]} />
          ))}
        </ul>
      </>
    );
  }
}

export default App;
