import React, { Component } from 'react';
import Button from './Button';
import Sign from './Sign';
import signs from '../js/signs.js';
import Inventory from './Inventory';
import base from '../js/base';

class App extends Component {
  state = {
    signs: []
  };

  componentDidMount() {
    this.ref = base.syncState('signs', {
      context: this,
      state: 'signs'
    });
  }

  loadSigns = () => {
    this.setState({ signs });
  };

  updateSign = (key, updatedSign) => {
    // console.log('update sign');
    // 1. copy the current state
    const signs = { ...this.state.signs };
    // 2. update that state key/value
    signs[key] = updatedSign;
    // 3. set the new copy to the component state
    this.setState({ signs });
  };

  deleteSign = () => {
    console.log('delete sign');
  };

  render() {
    return (
      <>
        <div className="app">
          <ul className="signs">
            {Object.keys(this.state.signs).map(key => (
              <Sign key={key} details={this.state.signs[key]} />
            ))}
          </ul>
          <section className="admin">
            <Button loadSigns={this.loadSigns} />
            <Inventory
              updateSign={this.updateSign}
              deleteSign={this.deleteSign}
              signs={this.state.signs}
            />
          </section>
        </div>
      </>
    );
  }
}

export default App;
