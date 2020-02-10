import React, { Component } from 'react';

class Button extends Component {
  state = {
    message: ''
  };

  clickHandler(message) {
    console.log(message);
    this.setState({ message });
  }

  render() {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            // this.clickHandler(this.props.myMessage);
            // this.props.myMethod();
            this.props.loadSigns();
          }}
        >
          My Button
        </button>

        <div>{this.state.message}</div>
      </React.Fragment>
    );
  }
}

export default Button;
