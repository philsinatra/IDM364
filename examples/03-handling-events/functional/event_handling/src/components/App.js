import React, { useState, useEffect } from 'react';
import signs from '../js/signs';
import Sign from './Sign';

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  const loadSigns = () => {
    setData(signs);
  };

  const Signs = () => {
    if (Object.keys(data).length === 0) {
      return null;
    }

    return (
      <ul className="signs">
        {Object.keys(data).map(key => (
          <Sign key={key} details={data[key]} />
        ))}
      </ul>
    );
  };

  return (
    <>
      <button onClick={loadSigns}>Load Signs</button>
      <Signs />
    </>
  );
};

export default App;
