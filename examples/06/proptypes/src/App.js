import React from 'react';
import Button from './Button';
import { formatPrice } from './utilities';
import './App.css';

const App = () => {
  const updateState = () => {
    console.log('Update App State');
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button label="Fun With Proptypes" updateState={updateState} />
        <h1>{formatPrice(4238)}</h1>
      </header>
    </div>
  );
};

export default App;
