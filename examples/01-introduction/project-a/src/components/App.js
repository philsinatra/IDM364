class HelloWorld extends React.Component {
  render() {
    return React.createElement(
      'h1',
      this.props,
      `Hello ${this.props.frameworkName} world!`
    );
  }
}

ReactDOM.render(
  <div>
    <HelloWorld
      id="ember"
      frameworkName="Ember.js"
      title="A framework for creating ambitious web applications."
    />
    ,
    <HelloWorld
      id="backbone"
      frameworkName="Backbone.js"
      title="Web app structure from backbone.js"
    />
    ,
    <HelloWorld
      id="angular"
      frameworkName="Angular.js"
      title="JavaScript MVN Framework."
    />
  </div>,
  document.getElementById('content')
);
