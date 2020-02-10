import React from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import Clock from './components/Clock';

render(
  <>
    <Header />
    <Clock />
  </>,
  document.getElementById('app')
);
