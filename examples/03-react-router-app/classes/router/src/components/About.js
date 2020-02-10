// import React from 'react';

// const About = props => <h1>About {props.isCustom}</h1>;

// export default About;

import React, { Component } from 'react';

class About extends Component {
  render() {
    return <div>isCustom: {this.props.isCustom}</div>;
  }
}

export default About;
