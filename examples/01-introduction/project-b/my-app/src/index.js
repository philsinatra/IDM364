import React from 'react';
import { render } from 'react-dom';
import HelloWorld from './components/HelloWorld';
import Nav from './components/Nav';
import './css/screen.css';

render(
  <div>
    <Nav />
    <HelloWorld />
  </div>,
  document.getElementById('app')
);
