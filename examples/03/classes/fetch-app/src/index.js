import React from 'react';
import { render } from 'react-dom';
import Users from './components/Users';
import './css/bootstrap.css';

const dataUrl = './real-user-data.json';

render(
  <React.Fragment>
    <Users data-url={dataUrl} />
  </React.Fragment>,
  document.getElementById('app')
);
