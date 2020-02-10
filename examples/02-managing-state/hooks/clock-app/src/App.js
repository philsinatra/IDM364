import React, { useState } from 'react';

const App = () => {
  const getCurrentTime = () => {
    return new Date().toLocaleString();
  };

  const [time, setTime] = useState(getCurrentTime());

  const launchClock = () => {
    setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
  };

  launchClock();

  return <h1>{time}</h1>;
};

export default App;
