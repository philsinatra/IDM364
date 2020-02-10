import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './screen.css';

render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('app')
);
