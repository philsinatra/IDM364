import React, { useEffect, useState } from 'react';

const Counter = props => {
  const { name } = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component Loaded!');
  });

  useEffect(() => {
    console.log(`You clicked ${count} times!`);
  }, [count]);

  return (
    <div>
      <h1>
        Hi {name}, you clicked {count} times!
      </h1>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
      <button onClick={() => setCount(count - 1)}>Remove 1</button>
    </div>
  );
};

export default Counter;
